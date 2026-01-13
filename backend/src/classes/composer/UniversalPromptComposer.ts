/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type {
  PromptParams,
  PromptGeneratorOptions,
  CustomLabel,
} from './PromptParams';
import type { PromptUserRole } from '~/constants/prompt-user-roles';
import type { TargetAudience } from '~/constants/target-audience';

/**
 * UniversalPromptComposer (Ultimate)
 *
 * A highly customizable prompt construction engine.
 */
export default abstract class UniversalPromptComposer {
  /**
   * Generates the advanced prompt string based on content parameters and generator options.
   *
   * @param params - The content and behavior parameters (text, role, tone, etc.)
   * @param options - The generation options (formatting, reasoning style, few-shot, etc.)
   * @returns A formatted string ready for LLM ingestion
   *
   * @example
   * // Scenario 1: Standard Markdown Prompt with Chain of Thought
   * const prompt = UniversalPromptComposer.generate(
   *   {
   *     text: "What is the boiling point of water?",
   *     systemPrompt: "You are a helpful assistant.",
   *     format: "markdown",
   *     userRole: "Tutor",
   *     enhancementType: "answer",
   *   },
   *   {
   *     reasoningStyle: "step-by-step",
   *     reasoningVisibility: "visible",
   *     verbosity: "standard"
   *   }
   * );
   *
   * @example
   * // Scenario 2: Strict JSON Output with Schema Enforcement
   * const prompt = UniversalPromptComposer.generate(
   *   {
   *     text: "Extract names from the meeting transcript.",
   *     systemPrompt: "Data extraction bot.",
   *     format: "json",
   *     userRole: "Extractor",
   *     enhancementType: "extract_data",
   *   },
   *   {
   *     outputSchema: {
   *       type: "object",
   *       properties: { names: { type: "array", items: { type: "string" } } }
   *     },
   *     formatStyle: "plain", // No headers, just raw instructions
   *     negativeConstraints: ["Do not include explanations", "Do not include markdown formatting"]
   *   }
   * );
   *
   * @example
   * // Scenario 3: XML Formatted Prompt for Programmatic Parsing
   * const prompt = UniversalPromptComposer.generate(
   *   {
   *     text: "Debug this Python function.",
   *     systemPrompt: "Senior Dev.",
   *     format: "markdown",
   *     userRole: "Debugger",
   *     enhancementType: "debug",
   *     technicalJargonLevel: "professional"
   *   },
   *   {
   *     formatStyle: "xml",
   *     reasoningVisibility: "hidden",
   *     customLabels: { identity: "agent_config", payload: "task_data" }
   *   }
   * );
   *
   * @example
   * // Scenario 4: Few-Shot Learning for Creative Writing
   * const prompt = UniversalPromptComposer.generate(
   *   {
   *     text: "Write a headline about space travel.",
   *     systemPrompt: "Copywriter.",
   *     format: "text",
   *     userRole: "Writer",
   *     enhancementType: "generate",
   *   },
   *   {
   *     fewShotExamples: [
   *       { input: "New phone release", output: "The Future in Your Pocket: Arriving Now" },
   *       { input: "Coffee shop opens", output: "Brewing Dreams: Your New Morning Stop" }
   *     ],
   *     tone: "catchy",
   *     verbosity: "explanatory"
   *   }
   * );
   */
  public static generate(
    params: PromptParams,
    options?: PromptGeneratorOptions,
  ): string {
    // Merge options with defaults
    const opts: PromptGeneratorOptions = {
      verbosity: options?.verbosity || 'standard',
      formatStyle: options?.formatStyle || 'markdown',
      customLabels: options?.customLabels || ({} as Record<CustomLabel, any>),
      debugMode: options?.debugMode || false,

      // Prompt Engineering Options
      reasoningStyle: options?.reasoningStyle,
      outputSchema: options?.outputSchema,
      fewShotExamples: options?.fewShotExamples,
      negativeConstraints: options?.negativeConstraints,
      reasoningVisibility: options?.reasoningVisibility,
      chainOfThoughtPrefix: options?.chainOfThoughtPrefix,
      modality: options?.modality,
    };

    const buffer: string[] = [];

    // ==========================================
    // SECTION 1: IDENTITY
    // ==========================================
    this.addSection(buffer, 'identity', opts, () => {
      const parts: string[] = [];

      // Resolve Role System Prompt (Prefer object prompt if present, else top-level prompt)
      let roleSystemPrompt = params.systemPrompt || '';
      let roleName = '';
      const roleTraits: string[] = [];

      if (params.userRole) {
        // noinspection SuspiciousTypeOfGuard
        if (typeof params.userRole === 'string') {
          roleName = params.userRole;
          if (params.enhancementParameters?.personaTraits) {
            roleTraits.push(...(params.enhancementParameters.personaTraits as string[]));
          }
        } else {
          // PromptUserRole object
          const roleObj = params.userRole as PromptUserRole;
          roleName = roleObj.name;
          roleSystemPrompt = roleObj.systemPrompt || roleSystemPrompt;

          if (roleObj.expertiseLevel) roleTraits.push(roleObj.expertiseLevel);
          if (roleObj.tone?.length) roleTraits.push(roleObj.tone.join(', '));
          if (roleObj.capabilities?.length) roleTraits.push(`Skills: ${roleObj.capabilities.join(', ')}`);
          if (roleObj.category && opts.verbosity !== 'terse') {
            roleTraits.push(`Category: ${roleObj.category}`);
          }
        }
      }

      // Resolve Target Audience
      // noinspection SuspiciousTypeOfGuard
      if (params.targetAudience && typeof params.targetAudience !== 'string') {
        const aud = params.targetAudience as TargetAudience;
        if (opts.verbosity === 'terse') {
          parts.push(`Audience: ${aud.label}`);
        } else {
          parts.push(`**Target Audience:** ${aud.label}`);
          if (opts.verbosity === 'explanatory') {
            parts.push(`- **Context:** ${aud.summary}`);
            if (aud.tags.length) parts.push(`- **Tags:** ${aud.tags.join(', ')}`);
          }
        }
      }

      if (opts.verbosity === 'terse') {
        if (roleName) parts.push(`Role: ${roleName}`);
        if (params.enhancementType) parts.push(`Task: ${params.enhancementType.toUpperCase()}`);
        if (roleSystemPrompt) parts.push(`Note: ${roleSystemPrompt}`);
      } else {
        if (roleName) parts.push(`**Role:** ${roleName}`);
        if (roleTraits.length) {
          parts.push(`**Traits:** ${roleTraits.join(', ')}`);
        }
        if (opts.modality) parts.push(`**Modality:** ${opts.modality}`);

        const dir = roleSystemPrompt || 'Execute requested task.';
        if (opts.verbosity === 'explanatory') {
          // Add explanation text if applicable, keeping existing logic structure
          parts.push(
            `**Directive:** ${dir}${params.enhancementType ? ` (This persona is chosen to optimize for ${params.enhancementType}).` : ''}`,
          );
        } else {
          parts.push(`**Directive:** ${dir}`);
        }

        if (params.enhancementType) {
          parts.push(`**Task:** ${params.enhancementType.toUpperCase()}`);
        }
      }

      return parts.join('\n');
    });

    // ==========================================
    // SECTION 2: COGNITIVE ARCHITECTURE
    // ==========================================
    this.addSection(buffer, 'cognitive', opts, () => {
      const parts: string[] = [];

      if (opts.reasoningStyle) {
        let reasoningText = '';
        const style = opts.reasoningStyle;

        if (opts.verbosity === 'explanatory') {
          reasoningText = `To ensure high quality, you will use ${style} reasoning. `;
          if (style === 'step-by-step')
            reasoningText +=
              'This means breaking problems into sequential steps.';
          else if (style === 'tree-of-thoughts')
            reasoningText +=
              'This means exploring multiple branches of logic simultaneously.';
        } else {
          if (style === 'step-by-step')
            reasoningText = 'Break down into sequential steps.';
          else if (style === 'first-principles')
            reasoningText = 'Deconstruct to fundamental truths.';
          else if (style === 'compare-contrast')
            reasoningText = 'Compare and contrast perspectives.';
          else if (style === 'tree-of-thoughts')
            reasoningText = 'Explore multiple reasoning branches.';
        }

        if (opts.reasoningVisibility === 'hidden') {
          parts.push(
            `- Protocol: ${reasoningText} (Encapsulate in <thought> tags)`,
          );
        } else {
          parts.push(`- Protocol: ${reasoningText}`);
        }

        if (opts.chainOfThoughtPrefix) {
          parts.push(`- Trigger: "${opts.chainOfThoughtPrefix}"`);
        }
      }

      if (params.cognitiveLoad) {
        const map = {
          low: 'Elementary. Explain like I am 5.',
          medium: 'Professional/General.',
          high: 'Expert/Academic. High density.',
        };
        parts.push(`- Complexity: ${map[params.cognitiveLoad]}`);
      }

      if (params.informationDensity) {
        parts.push(
          `- Density: ${params.informationDensity === 'dense' ? 'High information packing.' : 'Verbose and explanatory.'}`,
        );
      }

      return parts.length ? parts.join('\n') : null;
    });

    // ==========================================
    // SECTION 3: FEW-SHOT
    // ==========================================
    if (opts.fewShotExamples?.length) {
      this.addSection(buffer, 'examples', opts, () => {
        const examples = opts
          .fewShotExamples!.map((ex, i) => {
          return `[Example ${i + 1}]\nInput: ${ex.input}\nOutput: ${ex.output}`;
        })
          .join('\n\n');
        return `Pattern Matching:\n${examples}`;
      });
    }

    // ==========================================
    // SECTION 4: CONSTRAINTS
    // ==========================================
    this.addSection(buffer, 'constraints', opts, () => {
      const parts: string[] = [];

      if (opts.negativeConstraints?.length) {
        const label =
          opts.verbosity === 'terse'
            ? "Don'ts:"
            : '**Negative Constraints (Avoid):**';
        parts.push(label);
        opts.negativeConstraints.forEach((c) => parts.push(`- ${c}`));
      }

      // Add Role Constraints if userRole is object and has constraints
      if (typeof params.userRole !== 'string' && (params.userRole as unknown as PromptUserRole)?.constraints?.length) {
        const label =
          opts.verbosity === 'terse'
            ? "Role Rules:"
            : '**Role Specific Constraints:**';
        parts.push(label);
        (params?.userRole as unknown as PromptUserRole)?.constraints?.forEach?.((c) => parts.push(`- ${c}`));
      }

      // Logic Cross-Check
      if (params.strictness && params.temperature) {
        if (params.strictness >= 8 && params.temperature < 0.3) {
          parts.push(
            opts.verbosity === 'terse'
              ? 'Mode: Strict/Factual.'
              : '**Fidelity Mode:** Strictly factual. No speculation.',
          );
        } else if (params.strictness < 4 && params.temperature > 0.8) {
          parts.push(
            opts.verbosity === 'terse'
              ? 'Mode: Creative.'
              : '**Creative Mode:** Prioritize novelty over strict facts.',
          );
        }
      }

      if (params.domainSpecificity)
        parts.push(`- Domain: ${params.domainSpecificity}`);
      if (params.technicalJargonLevel) {
        const map = {
          none: 'No Jargon.',
          layman: 'Define terms.',
          professional: 'Standard Jargon.',
          academic: 'Academic Jargon.',
        };
        parts.push(`- Jargon: ${map[params.technicalJargonLevel]}`);
      }
      if (params.culturalContext)
        parts.push(`- Culture: ${params.culturalContext}`);
      if (params.regulatoryCompliance?.length)
        parts.push(`- Compliance: ${params.regulatoryCompliance.join(', ')}`);

      return parts.length ? parts.join('\n') : null;
    });

    // ==========================================
    // SECTION 5: STRUCTURE
    // ==========================================
    this.addSection(buffer, 'structure', opts, () => {
      const parts: string[] = [];

      if (params.format === 'json' && opts.outputSchema) {
        parts.push(`Format: JSON (Strict Schema)`);
        if (opts.debugMode) parts.push(`[DEBUG] Schema injection enabled.`);
        parts.push(`\`\`\`json\n${JSON.stringify(opts.outputSchema)}\n\`\`\``);
      } else {
        parts.push(`Format: ${params.format.toUpperCase()}`);
      }

      if (params.paragraphFlow) parts.push(`Flow: ${params.paragraphFlow}`);
      if (params.sentenceStructure)
        parts.push(`Syntax: ${params.sentenceStructure}`);
      if (params.tone) parts.push(`Tone: ${params.tone}`);
      if (params.emotionalIntensity)
        parts.push(`Intensity: ${params.emotionalIntensity}/10`);
      if (params.persuasionTechnique)
        parts.push(`Rhetoric: ${params.persuasionTechnique}`);

      return parts.length ? parts.join('\n') : null;
    });

    // ==========================================
    // SECTION 6: OPERATIONS
    // ==========================================
    this.addSection(buffer, 'operations', opts, () => {
      const parts: string[] = [];
      if (params.responseLength) parts.push(`Length: ${params.responseLength}`);
      if (params.maxTokens) parts.push(`Limit: ${params.maxTokens} tokens`);
      if (params.minimalOutput) parts.push(`Style: Minimal (No filler)`);
      if (params.stopSequences?.length)
        parts.push(
          `Stop: [${params.stopSequences.map((s) => `"${s}"`).join(', ')}]`,
        );
      if (params.language) parts.push(`Lang: ${params.language}`);
      return parts.length ? parts.join('\n') : null;
    });

    // ==========================================
    // SECTION 7: SPECIAL INSTRUCTIONS
    // ==========================================
    if (params.customInstructions) {
      this.addSection(
        buffer,
        'special',
        opts,
        () => params.customInstructions!,
      );
    }

    // ==========================================
    // SECTION 8: PAYLOAD
    // ==========================================
    this.addSection(
      buffer,
      'payload',
      opts,
      () => {
        if (opts.verbosity === 'terse') {
          return `Input:\n"${params.text}"`;
        }
        return `Process${opts.reasoningStyle ? ' using the defined reasoning protocol' : ''} the following input based on directives above:\n"""\n${params.text}\n"""`;
      },
      false,
    ); // Payload is mandatory

    // ==========================================
    // SECTION 9: METADATA
    // ==========================================
    if (params.includeMetadata) {
      this.addSection(buffer, 'metadata', opts, () => {
        const meta: string[] = [];
        meta.push(`Provider: ${params.provider || 'Unknown'}`);
        meta.push(`Model: ${params.model || 'Unknown'}`);
        meta.push(`Time: ${params.timestamp || new Date().toISOString()}`);
        if (params.offTheRecord) meta.push(`SECURE: OFF-THE-RECORD`);
        return meta.join('\n');
      });
    }

    return buffer.join('\n');
  }

  /**
   * Helper to conditionally add sections with customizable formatting.
   */
  private static addSection(
    buffer: string[],
    key: CustomLabel,
    options: PromptGeneratorOptions,
    contentBuilder: () => string | null,
    omitIfEmpty: boolean = true,
  ): void {
    const content = contentBuilder();
    if (omitIfEmpty && !content) return;

    // Determine Header
    const defaultLabels: Record<string, string> = {
      identity: 'SYSTEM IDENTITY',
      cognitive: 'COGNITIVE ARCHITECTURE',
      examples: 'FEW-SHOT REFERENCE',
      constraints: 'CONSTRAINTS & BOUNDARIES',
      structure: 'OUTPUT STRUCTURE',
      operations: 'OPERATIONAL PARAMETERS',
      special: 'SPECIAL INSTRUCTIONS',
      payload: 'INPUT PAYLOAD',
      metadata: 'SESSION METADATA',
    };

    const label = String(options?.customLabels?.[key] || defaultLabels[key]);

    // Format Header based on style
    let header;
    if (options.formatStyle === 'xml') {
      header = `<${label.toLowerCase().replace(/\s+/g, '_')}>`;
    } else if (options.formatStyle === 'plain') {
      header = `[ ${label.toUpperCase()} ]`;
    } else {
      header = `### ${label}`;
    }

    buffer.push(`\n${header}`);
    buffer.push(content!);

    // Footer for XML style
    if (options.formatStyle === 'xml') {
      buffer.push(`</${label.toLowerCase().replace(/\s+/g, '_')}>`);
    }
    buffer.push(''); // Trailing newline
  }
}
