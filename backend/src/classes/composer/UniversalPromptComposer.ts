// noinspection SuspiciousTypeOfGuard

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {
  CustomLabel,
  PromptGeneratorOptions,
  PromptParamsNormalized,
} from '~/classes/composer/PromptParams';
import { PromptUserRole } from '~/constants/prompt-user-roles';

/**
 * UniversalPromptComposer
 *
 * An advanced, highly configurable prompt engineering engine designed to construct
 * robust, multi-layered prompts for Large Language Models (LLMs).
 *
 * ## Core Philosophy
 * This class breaks down prompt generation into semantic sections: Identity, Experience,
 * Cognitive Architecture, Content Guidelines, Constraints, and Operations.
 *
 * ## Usage Guide
 * 1. **Basic Generation**: Use `generate(params)` for standard prompts.
 * 2. **Advanced Tweaking**: Utilize `PromptGeneratorOptions` to control verbosity,
 *    reasoning styles (Chain of Thought), and few-shot examples.
 * 3. **Persona Calibration**: Use the `experience` and `skills` parameters in `PromptParams`
 *    to deeply simulate specific human expertise levels.
 *
 * @example
 * ```typescript
 * // Basic Example
 * const prompt = UniversalPromptComposer.generate({
 *   text: "Explain quantum entanglement.",
 *   systemPrompt: "You are a physics professor.",
 *   format: "markdown"
 * });
 *
 * // Advanced Example with Tweaking
 * const advancedPrompt = UniversalPromptComposer.generate({
 *   text: "Analyze the market trends.",
 *   systemPrompt: "You are a senior financial analyst.",
 *   format: "json",
 *   userRole: { name: "Analyst", expertiseLevel: "Expert", tone: ["Formal", "Precise"] },
 *   experience: "10 years",
 *   reasoningDepth: 9,
 *   cognitiveLoad: "high"
 * }, {
 *   verbosity: "explanatory",
 *   reasoningStyle: "first-principles",
 *   reasoningVisibility: "hidden",
 *   fewShotExamples: [{ input: "Stock up", output: "Bullish trend detected" }]
 * });
 * ```
 */
export default abstract class UniversalPromptComposer {
  /**
   * Static mappings for translating enum-like parameters into human-readable instructions.
   * Extracting these allows for easy adjustments without changing logic logic.
   */
  private static readonly MAPPINGS = {
    verbosity: {
      terse: 'terse',
      standard: 'standard',
      explanatory: 'explanatory',
    },
    cognitive: {
      load: {
        low: 'Elementary. Explain like I am 5.',
        medium: 'Professional/General.',
        high: 'Expert/Academic. High density.',
      },
      density: {
        sparse: 'Verbose and explanatory.',
        balanced: 'Balanced information.',
        dense: 'High information packing.',
      },
      abstraction: {
        concrete: 'Focus on specific examples and instances.',
        abstract: 'Work with general principles and theories.',
        mixed: 'Combine concrete examples with abstract principles.',
      },
      metaphor: {
        none: 'No metaphors or figurative language.',
        light: 'Occasional use of metaphors for clarity.',
        heavy: 'Extensive use of figurative language and analogies.',
      },
      ambiguity: {
        low: 'Be precise and unambiguous.',
        medium: 'Allow for some ambiguity when appropriate.',
        high: 'Embrace open-ended interpretations.',
      },
    },
    reasoning: {
      'step-by-step': 'Break down into sequential steps.',
      'first-principles': 'Deconstruct to fundamental truths.',
      'tree-of-thoughts': 'Explore multiple reasoning branches.',
      'compare-contrast': 'Compare and contrast perspectives.',
    },
    experience: {
      pattern: {
        linear: 'Sequential, step-by-step thought chains.',
        synthetic: 'Combining disparate elements into new wholes.',
        hierarchical: 'Top-down, structured categorization.',
        network: 'Interconnected, nodal logic flow.',
        holistic: 'Seeing the big picture first, then details.',
        combinatorial: 'Exploring permutations and combinations.',
        differential: 'Analyzing changes and rates of change.',
        evolutionary: 'Iterative improvement and adaptation.',
      },
    },
    format: {
      json: 'json',
      markdown: 'markdown',
      text: 'text',
      html: 'html',
      xml: 'xml',
      yaml: 'yaml',
      csv: 'csv',
    },
  };

  /**
   * Default section labels for the prompt composition structure.
   * Defines the human-readable headers used to organize different parts
   * of the generated prompt (identity, cognitive parameters, etc.).
   */
  private static readonly DEFAULT_LABELS: Record<string, string> = {
    identity: 'SYSTEM IDENTITY',
    experience: 'EXPERTISE & CALIBRATION',
    cognitive: 'COGNITIVE ARCHITECTURE',
    content: 'CONTENT GUIDELINES',
    constraints: 'CONSTRAINTS & BOUNDARIES',
    structure: 'OUTPUT STRUCTURE',
    operations: 'OPERATIONAL PARAMETERS',
    special: 'SPECIAL INSTRUCTIONS',
    payload: 'INPUT PAYLOAD',
    metadata: 'SESSION METADATA',
    examples: 'FEW-SHOT EXAMPLES',
  };

  /**
   * Generates the advanced prompt string based on comprehensive content parameters.
   *
   * @param params - The comprehensive content and behavior parameters
   * @param options - The generation options controlling presentation, reasoning style, formatting, and advanced prompt engineering strategies
   * @returns A formatted, comprehensive prompt string ready for LLM ingestion
   */
  public static generate(
    params: PromptParamsNormalized,
    options?: PromptGeneratorOptions,
  ): string {
    this.validateParams(params);
    let opts = this.validateAndMergeOptions(options);

    // Adaptive Logic: Adjust verbosity based on input length if enabled
    if (opts.enableAdaptiveGeneration) {
      opts = this.applyAdaptiveGeneration(params, opts);
    }

    const buffer: string[] = [];
    const buildMap = this.getBuilderMap();
    const executionOrder = this.determineExecutionOrder(opts);

    this.debugLog(buffer, 'INITIALIZING PROMPT GENERATION', opts.debugMode);

    // Execute section builders
    executionOrder.forEach((sectionKey) => {
      const builder = buildMap[sectionKey];
      if (builder) {
        builder.call(this, buffer, params, opts);
      } else if (sectionKey === 'examples' && !opts.fewShotExamples) {
        // Skip empty examples section
      }
    });

    // Ensure payload is always last
    if (!executionOrder.includes('payload')) {
      this.buildPayloadSection(buffer, params, opts);
    }

    return this.formatOutput(buffer, opts);
  }

  /**
   * Returns a Markdown guide for advanced tweaking of the prompt generator.
   * Useful for documentation or help commands.
   */
  public static getTweakingGuide(): string {
    return `
# UniversalPromptComposer Tweaking Guide

## 1. Presentation Controls
- **verbosity**:
  - \`terse\`: Use for token-constrained environments or very simple tasks.
  - \`explanatory\`: Use for complex reasoning tasks where the LLM needs explicit "why" instructions.
- **formatStyle**:
  - \`xml\`: Best for models that parse XML tags strictly (like some Claude versions).
  - \`markdown\`: Best for GPT-4 and general purpose.

## 2. Prompt Engineering Controls
- **reasoningStyle**:
  - \`step-by-step\`: Forces linear logic (great for math).
  - \`tree-of-thoughts\`: Forces the model to explore branches (great for creative writing or strategy).
  - \`compare-contrast\`: Great for analysis or critique tasks.
- **reasoningVisibility**:
  - \`hidden\`: Wraps thoughts in <thought> tags (cleaner output).
  - \`visible\`: Includes thoughts in the final response (transparent output).
- **fewShotExamples**:
  - Provide 1-3 high-quality examples. The quality of the output often matches the quality of the examples provided.

## 3. Experience Parameters (The "Human" Simulation)
- **thinkingPattern**:
  - \`hierarchical\`: Good for structured reporting.
  - \`holistic\`: Good for high-level strategy or philosophy.
- **Internal Calibration (0.0 - 1.0)**:
  - \`contextSensitivity\`: High = very aware of subtle nuances.
  - \`criticalThinking\`: High = skeptical, challenging assumptions.
  - \`creativeThinking\`: High = prone to neologisms and novel connections.
`;
  }

  /**
   * Automatically adjusts generation options based on input complexity.
   * Currently switches verbosity to 'terse' when input exceeds 2000 characters
   * to optimize token usage for long inputs.
   *
   * @example
   * ```typescript
   * const params = { text: 'a'.repeat(2500), ...otherParams };
   * const opts = { verbosity: 'explanatory', enableAdaptiveGeneration: true };
   * const adjusted = this.applyAdaptiveGeneration(params, opts);
   * // adjusted.verbosity === 'terse' (verbosity was auto-adjusted due to length)
   * ```
   */
  private static applyAdaptiveGeneration(
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): PromptGeneratorOptions {
    const complexityScore = params.text.length;
    if (complexityScore > 2000 && opts.verbosity !== 'terse') {
      this.debugLog(
        [],
        '[ADAPTIVE] Input length > 2000. Switching verbosity to TERSE.',
        opts.debugMode,
      );
      return { ...opts, verbosity: 'terse' };
    }
    return opts;
  }

  /**
   * Determines the execution order of prompt sections.
   * Uses custom priority from options if provided, otherwise uses default order.
   * Always ensures 'payload' section is included last.
   *
   * @example
   * ```typescript
   * // Default order
   * const order1 = this.determineExecutionOrder({});
   * // ['identity', 'experience', 'cognitive', ... 'payload']
   *
   * // Custom priority
   * const order2 = this.determineExecutionOrder({
   *   elementPriority: ['cognitive', 'identity']
   * });
   * // ['cognitive', 'identity', 'payload']
   * ```
   */
  private static determineExecutionOrder(
    opts: PromptGeneratorOptions,
  ): CustomLabel[] {
    const defaultOrder: CustomLabel[] = [
      'identity',
      'experience',
      'cognitive',
      'content',
      'constraints',
      'structure',
      'operations',
      'special',
      'payload',
      'metadata',
    ];

    if (opts.elementPriority) {
      return [...opts.elementPriority, 'payload'] as CustomLabel[];
    }
    return defaultOrder;
  }

  /**
   * Returns a mapping of section keys to their builder methods.
   * Maps logical section names (like 'identity', 'cognitive') to the
   * corresponding private static methods that build each section.
   *
   * @example
   * ```typescript
   * const builders = this.getBuilderMap();
   * const identityBuilder = builders['identity']; // buildIdentitySection
   * identityBuilder.call(this, buffer, params, opts); // Builds identity section
   * ```
   */
  private static getBuilderMap(): Record<
    string,
    (b: string[], p: PromptParamsNormalized, o: PromptGeneratorOptions) => void
  > {
    return {
      identity: this.buildIdentitySection,
      context: this.buildExperienceSection,
      constraints: this.buildConstraintsSection,
      examples: this.buildExamplesSection,
      content: this.buildContentSection,
      structure: this.buildStructureSection,
      operations: this.buildOperationsSection,
      experience: this.buildExperienceSection,
      cognitive: this.buildCognitiveSection,
      special: this.buildSpecialInstructionsSection,
      payload: this.buildPayloadSection,
      metadata: this.buildMetadataSection,
    };
  }

  // ==========================================
  // VALIDATION
  // ==========================================

  /**
   * Validates required parameters for prompt generation.
   * Ensures text, systemPrompt, and format are present and valid.
   * Throws descriptive errors for missing or invalid parameters.
   *
   * @example
   * ```typescript
   * // Valid params - passes silently
   * this.validateParams({
   *   text: 'Hello world',
   *   systemPrompt: 'You are helpful',
   *   format: 'json'
   * });
   *
   * // Invalid - throws 'Required parameter "text" is missing or invalid'
   * this.validateParams({ text: '', systemPrompt: 'test', format: 'json' });
   *
   * // Invalid format - throws with valid format list
   * this.validateParams({ text: 'test', systemPrompt: 'test', format: 'invalid' });
   * ```
   */
  private static validateParams(params: PromptParamsNormalized): void {
    if (
      !params.text ||
      typeof params.text !== 'string' ||
      !params.text.trim()
    ) {
      throw new Error('Required parameter "text" is missing or invalid');
    }
    if (
      !params.systemPrompt ||
      typeof params.systemPrompt !== 'string' ||
      !params.systemPrompt.trim()
    ) {
      throw new Error(
        'Required parameter "systemPrompt" is missing or invalid',
      );
    }
    if (!params.format)
      throw new Error('Required parameter "format" is missing');
    if (
      !Object.values(this.MAPPINGS.format).includes(params.format as string)
    ) {
      throw new Error(
        `Invalid format: "${params.format}". Must be one of: ${Object.values(
          this.MAPPINGS.format,
        ).join(', ')}`,
      );
    }
  }

  /**
   * Merges provided options with defaults and validates all values.
   * Applies validation to enum-like fields, falling back to defaults for invalid values.
   *
   * @example
   * ```typescript
   * // With defaults only
   * const opts1 = this.validateAndMergeOptions();
   * // { verbosity: 'standard', formatStyle: 'markdown', ... }
   *
   * // With custom options
   * const opts2 = this.validateAndMergeOptions({
   *   verbosity: 'explanatory',
   *   debugMode: true
   * });
   * // Merges custom values with defaults, validates all fields
   *
   * // Invalid values fall back to defaults
   * const opts3 = this.validateAndMergeOptions({ verbosity: 'invalid' });
   * // opts3.verbosity === 'standard' (fallback)
   * ```
   */
  private static validateAndMergeOptions(
    options?: PromptGeneratorOptions,
  ): PromptGeneratorOptions {
    const defaults: PromptGeneratorOptions = {
      verbosity: 'standard',
      formatStyle: 'markdown',
      customLabels: {},
      debugMode: false,
      reasoningStyle: undefined,
      outputSchema: undefined,
      fewShotExamples: undefined,
      negativeConstraints: undefined,
      reasoningVisibility: undefined,
      chainOfThoughtPrefix: undefined,
      modality: undefined,
      creativityLevel: 'balanced',
      defaultResponseLength: 'medium',
      enableProgressiveRefinement: false,
      maxRefinementIterations: 3,
      elementPriority: undefined,
      enableAdaptiveGeneration: false,
    };

    const merged = { ...defaults, ...options };

    return {
      ...merged,
      verbosity: this.validateVerbosity(merged.verbosity) || defaults.verbosity,
      formatStyle:
        this.validateFormatStyle(merged.formatStyle) || defaults.formatStyle,
      reasoningVisibility:
        this.validateReasoningVisibility(merged.reasoningVisibility) ||
        'visible',
      modality: this.validateModality(merged.modality),
      creativityLevel:
        this.validateCreativityLevel(merged.creativityLevel) ||
        defaults.creativityLevel,
      defaultResponseLength:
        this.validateResponseLength(merged.defaultResponseLength) ||
        defaults.defaultResponseLength,
    };
  }

  // Individual Validators

  /**
   * Validates verbosity setting against allowed values.
   * Returns null for invalid inputs to trigger fallback to default.
   *
   * @example
   * ```typescript
   * this.validateVerbosity('terse');     // 'terse'
   * this.validateVerbosity('standard');  // 'standard'
   * this.validateVerbosity('explanatory'); // 'explanatory'
   * this.validateVerbosity('verbose');   // null (invalid)
   * this.validateVerbosity(undefined);   // null
   * ```
   */
  private static validateVerbosity(
    verbosity?: string,
  ): 'terse' | 'standard' | 'explanatory' | null {
    return Object.values(this.MAPPINGS.verbosity).includes(verbosity as any)
      ? (verbosity as any)
      : null;
  }

  /**
   * Validates format style for output formatting.
   * Supports 'markdown', 'xml', and 'plain' text formats.
   *
   * @example
   * ```typescript
   * this.validateFormatStyle('markdown'); // 'markdown'
   * this.validateFormatStyle('xml');      // 'xml'
   * this.validateFormatStyle('plain');    // 'plain'
   * this.validateFormatStyle('html');     // null (invalid)
   * ```
   */
  private static validateFormatStyle(
    formatStyle?: string,
  ): 'markdown' | 'xml' | 'plain' | null {
    if (!formatStyle) return null;
    const valid = ['markdown', 'xml', 'plain'];
    return valid.includes(formatStyle) ? (formatStyle as any) : null;
  }

  /**
   * Validates reasoning visibility setting.
   * Controls whether chain-of-thought reasoning is shown or hidden.
   *
   * @example
   * ```typescript
   * this.validateReasoningVisibility('hidden');  // 'hidden'
   * this.validateReasoningVisibility('visible'); // 'visible'
   * this.validateReasoningVisibility('show');    // 'visible' (fallback)
   * this.validateReasoningVisibility(undefined); // 'visible' (default)
   * ```
   */
  private static validateReasoningVisibility(
    visibility?: string,
  ): 'hidden' | 'visible' {
    if (!visibility) return 'visible';
    return visibility === 'hidden' ? 'hidden' : 'visible';
  }

  /**
   * Validates modality setting for specialized output types.
   * Supports text, code, math, and multimodal outputs.
   *
   * @example
   * ```typescript
   * this.validateModality('code');        // 'code'
   * this.validateModality('math');        // 'math'
   * this.validateModality('text');        // 'text'
   * this.validateModality('multimodal');  // 'multimodal'
   * this.validateModality('audio');       // null (invalid)
   * ```
   */
  private static validateModality(
    modality?: string | null,
  ): 'text' | 'code' | 'math' | 'multimodal' | null {
    if (!modality) return null;
    const valid = ['text', 'code', 'math', 'multimodal'];
    return valid.includes(modality) ? (modality as any) : null;
  }

  /**
   * Validates creativity level for controlling output originality.
   *
   * @example
   * ```typescript
   * this.validateCreativityLevel('conservative'); // 'conservative'
   * this.validateCreativityLevel('balanced');     // 'balanced'
   * this.validateCreativityLevel('creative');     // 'creative'
   * this.validateCreativityLevel('wild');         // null (invalid)
   * ```
   */
  private static validateCreativityLevel(
    level?: string,
  ): 'conservative' | 'balanced' | 'creative' | null {
    if (!level) return null;
    const valid = ['conservative', 'balanced', 'creative'];
    return valid.includes(level) ? (level as any) : null;
  }

  /**
   * Validates response length preference.
   *
   * @example
   * ```typescript
   * this.validateResponseLength('brief');   // 'brief'
   * this.validateResponseLength('medium');  // 'medium'
   * this.validateResponseLength('detailed'); // 'detailed'
   * this.validateResponseLength('long');    // null (invalid)
   * ```
   */
  private static validateResponseLength(
    length?: string,
  ): 'brief' | 'medium' | 'detailed' | null {
    if (!length) return null;
    const valid = ['brief', 'medium', 'detailed'];
    return valid.includes(length) ? (length as any) : null;
  }

  // ==========================================
  // SECTION BUILDERS
  // ==========================================

  /**
   * Builds the identity section defining the AI's role and persona.
   * Formats role name, traits, modality, directive, and task type.
   * Output varies by verbosity level (terse vs standard).
   *
   * @example
   * ```typescript
   * const buffer: string[] = [];
   * const params = {
   *   systemPrompt: 'You are a helpful assistant',
   *   userRole: { name: 'Expert', expertiseLevel: 'Senior', tone: ['Professional'] },
   *   // ... other params
   * };
   * this.buildIdentitySection(buffer, params, { verbosity: 'standard' });
   * // Adds formatted identity section to buffer
   * ```
   */
  private static buildIdentitySection(
    buffer: string[],
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): void {
    this.debugLog(buffer, 'BUILDING IDENTITY SECTION', opts.debugMode);
    const parts: string[] = [];

    const { roleName, roleTraits, roleSystemPrompt } = this.resolveRoleData(
      params,
      opts,
    );
    const audienceStr = this.formatAudience(params, opts);
    const taskType = this.resolveTaskType(params);

    if (opts.verbosity === 'terse') {
      if (roleName) parts.push(`Role: ${roleName}`);
      if (taskType) parts.push(`Task: ${taskType.toUpperCase()}`);
      if (roleSystemPrompt) parts.push(`Note: ${roleSystemPrompt}`);
    } else {
      if (roleName) parts.push(`**Role:** ${roleName}`);
      if (roleTraits.length) parts.push(`**Traits:** ${roleTraits.join(', ')}`);
      if (opts.modality) parts.push(`**Modality:** ${opts.modality}`);

      const dir = roleSystemPrompt || 'Execute requested task.';
      const directive =
        opts.verbosity === 'explanatory' && taskType
          ? `${dir} (Persona optimized for ${taskType})`
          : dir;

      parts.push(`**Directive:** ${directive}`);
      if (taskType) parts.push(`**Task:** ${taskType.toUpperCase()}`);
    }

    if (audienceStr) parts.push(audienceStr);

    this.addSection(buffer, 'identity', opts, parts.join('\n'));
  }

  /**
   * Builds the experience section with expertise and calibration details.
   * Includes tenure, maturity level, thinking patterns, skills, and metrics.
   *
   * @example
   * ```typescript
   * const buffer: string[] = [];
   * const params = {
   *   experience: '10 years',
   *   experienceLevel: 8,
   *   thinkingPattern: 'holistic',
   *   skills: ['TypeScript', 'AI'],
   *   // ... other params
   * };
   * this.buildExperienceSection(buffer, params, { verbosity: 'standard' });
   * // Adds experience section with skills and calibration
   * ```
   */
  private static buildExperienceSection(
    buffer: string[],
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): void {
    this.debugLog(buffer, 'BUILDING EXPERIENCE SECTION', opts.debugMode);
    const parts: string[] = [];

    if (params.experience) parts.push(`- **Tenure:** ${params.experience}`);
    if (params.experienceLevel !== undefined)
      parts.push(`- **Maturity Level:** ${params.experienceLevel}/10`);

    if (params.thinkingPattern) {
      const desc =
        this.MAPPINGS.experience.pattern[params.thinkingPattern] ||
        params.thinkingPattern;
      parts.push(`- **Cognitive Topology:** ${desc}`);
    }

    if (params.problemSolvingApproach)
      parts.push(`- **Heuristic Strategy:** ${params.problemSolvingApproach}`);

    this.appendSkillsSection(parts, params, opts);
    this.appendCalibrationSection(parts, params, opts);

    if (parts.length > 0)
      this.addSection(buffer, 'experience', opts, parts.join('\n'));
  }

  /**
   * Builds the cognitive architecture section with reasoning and thinking parameters.
   * Configures reasoning style, depth, complexity, and information processing preferences.
   *
   * @example
   * ```typescript
   * const buffer: string[] = [];
   * const params = {
   *   reasoningDepth: 8,
   *   cognitiveLoad: 'high',
   *   informationDensity: 'dense',
   *   // ... other params
   * };
   * const opts = {
   *   reasoningStyle: 'first-principles',
   *   reasoningVisibility: 'hidden',
   *   chainOfThoughtPrefix: 'Let me think...'
   * };
   * this.buildCognitiveSection(buffer, params, opts);
   * // Adds cognitive configuration with reasoning protocol
   * ```
   */
  private static buildCognitiveSection(
    buffer: string[],
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): void {
    this.debugLog(buffer, 'BUILDING COGNITIVE SECTION', opts.debugMode);
    const parts: string[] = [];

    // Reasoning Style
    if (opts.reasoningStyle) {
      const instruction = this.getReasoningInstruction(
        opts.reasoningStyle,
        opts.verbosity,
      );
      const visibility =
        opts.reasoningVisibility === 'hidden'
          ? ' (Encapsulate in <thought> tags)'
          : '';
      parts.push(`- Protocol: ${instruction}${visibility}`);

      if (opts.chainOfThoughtPrefix)
        parts.push(`- Trigger: "${opts.chainOfThoughtPrefix}"`);
    }

    // Depth & Load
    if (params.reasoningDepth)
      parts.push(`- Reasoning Depth: ${params.reasoningDepth}/10`);
    if (params.cognitiveLoad)
      parts.push(
        `- Complexity: ${this.MAPPINGS.cognitive.load[params.cognitiveLoad]}`,
      );

    // Information style
    if (params.informationDensity)
      parts.push(
        `- Density: ${
          params.informationDensity === 'dense'
            ? 'High information packing.'
            : 'Verbose and explanatory.'
        }`,
      );
    if (params.abstractionLevel)
      parts.push(
        `- Abstraction: ${this.MAPPINGS.cognitive.abstraction[params.abstractionLevel]}`,
      );
    if (params.metaphorUsage)
      parts.push(
        `- Metaphors: ${this.MAPPINGS.cognitive.metaphor[params.metaphorUsage]}`,
      );
    if (params.ambiguityTolerance)
      parts.push(
        `- Ambiguity: ${this.MAPPINGS.cognitive.ambiguity[params.ambiguityTolerance]}`,
      );

    if (parts.length > 0)
      this.addSection(buffer, 'cognitive', opts, parts.join('\n'));
  }

  /**
   * Builds content guidelines section with writing and stylistic parameters.
   * Configures writing style, perspective, specificity, and detail level.
   *
   * @example
   * ```typescript
   * const buffer: string[] = [];
   * const params = {
   *   writingStyle: 'academic',
   *   narrativePerspective: 'third-person',
   *   detailLevel: 'comprehensive',
   *   // ... other params
   * };
   * this.buildContentSection(buffer, params, { verbosity: 'standard' });
   * // Adds content guidelines with detail mapping
   * ```
   */
  private static buildContentSection(
    buffer: string[],
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): void {
    this.debugLog(buffer, 'BUILDING CONTENT GUIDELINES', opts.debugMode);
    const parts: string[] = [];

    if (params.writingStyle) parts.push(`Style: ${params.writingStyle}`);
    if (params.narrativePerspective)
      parts.push(`Perspective: ${params.narrativePerspective}`);
    if (params.exampleSpecificity)
      parts.push(`Examples: ${params.exampleSpecificity}`); // Simplified mapping for brevity
    if (params.dataGranularity) parts.push(`Data: ${params.dataGranularity}`);
    if (params.technicalDepth)
      parts.push(`Technical: ${params.technicalDepth}`);

    // Keeping detailed mapping for detailLevel as it is complex
    if (params.detailLevel) {
      const detailMap: Record<string, string> = {
        'ultra-minimal': 'Brief, to the point.',
        minimal: 'Concise explanations.',
        concise: 'Moderate detail.',
        moderate: 'Balanced detail.',
        detailed: 'Comprehensive coverage.',
        comprehensive: 'Extensive detail.',
        'ultra-detailed': 'Every nuance covered.',
      };
      parts.push(`Detail: ${detailMap[params.detailLevel]}`);
    }

    if (parts.length > 0)
      this.addSection(buffer, 'content', opts, parts.join('\n'));
  }

  /**
   * Builds the examples section for Few-Shot prompting.
   */
  private static buildExamplesSection(
    buffer: string[],
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): void {
    if (opts.debugMode) buffer.push('[DEBUG] BUILDING EXAMPLES SECTION');

    if (opts.fewShotExamples && opts.fewShotExamples.length > 0) {
      const parts: string[] = [];
      parts.push(
        'Analyze the following examples to understand the desired output pattern:',
      );
      parts.push('');

      opts.fewShotExamples.forEach((ex, index) => {
        parts.push(`Example ${index + 1}:`);
        parts.push(`Input: ${ex.input}`);
        parts.push(`Output: ${ex.output}`);
        parts.push('---');
      });

      this.addSection(buffer, 'examples', opts, parts.join('\n'));
    }
  }

  /**
   * Builds constraints section with boundaries and limitations.
   * Includes negative constraints, role rules, strictness/temperature modes,
   * and compliance requirements.
   *
   * @example
   * ```typescript
   * const buffer: string[] = [];
   * const params = {
   *   strictness: 9,
   *   temperature: 0.1,
   *   domainSpecificity: 'medical',
   *   // ... other params
   * };
   * const opts = {
   *   negativeConstraints: ['No speculation', 'No opinions'],
   *   verbosity: 'standard'
   * };
   * this.buildConstraintsSection(buffer, params, opts);
   * // Adds constraints with strict/factual mode activated
   * ```
   */
  private static buildConstraintsSection(
    buffer: string[],
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): void {
    this.debugLog(buffer, 'BUILDING CONSTRAINTS SECTION', opts.debugMode);
    const parts: string[] = [];

    if (opts.negativeConstraints?.length) {
      const label =
        opts.verbosity === 'terse'
          ? "Don'ts:"
          : '**Negative Constraints (Avoid):**';
      parts.push(label);
      opts.negativeConstraints.forEach((c) => parts.push(`- ${c}`));
    }

    if (
      typeof params.userRole !== 'string' &&
      (params.userRole as unknown as PromptUserRole)?.constraints?.length
    ) {
      const label =
        opts.verbosity === 'terse'
          ? 'Role Rules:'
          : '**Role Specific Constraints:**';
      parts.push(label);
      (params?.userRole as unknown as PromptUserRole)?.constraints?.forEach?.(
        (c) => parts.push(`- ${c}`),
      );
    }

    // Strictness vs Temperature
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
    if (params.technicalJargonLevel)
      parts.push(`- Jargon: ${params.technicalJargonLevel}`);
    if (params.culturalContext)
      parts.push(`- Culture: ${params.culturalContext}`);
    if (params.regulatoryCompliance?.length)
      parts.push(`- Compliance: ${params.regulatoryCompliance.join(', ')}`);

    if (parts.length > 0)
      this.addSection(buffer, 'constraints', opts, parts.join('\n'));
  }

  /**
   * Builds output structure section with formatting and stylistic parameters.
   * Configures format, schema, flow, tone, and rhetorical approach.
   *
   * @example
   * ```typescript
   * const buffer: string[] = [];
   * const params = {
   *   format: 'json',
   *   paragraphFlow: 'logical',
   *   tone: 'professional',
   *   emotionalIntensity: 3,
   *   // ... other params
   * };
   * const opts = {
   *   outputSchema: { type: 'object', properties: { result: { type: 'string' } } }
   * };
   * this.buildStructureSection(buffer, params, opts);
   * // Adds structure section with JSON schema
   * ```
   */
  private static buildStructureSection(
    buffer: string[],
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): void {
    this.debugLog(buffer, 'BUILDING STRUCTURE SECTION', opts.debugMode);
    const parts: string[] = [];

    if (params.format === 'json' && opts.outputSchema) {
      parts.push(`Format: JSON (Strict Schema)`);
      if (opts.debugMode) parts.push(`[DEBUG] Schema injection enabled.`);
      parts.push(
        `\`\`\`json\n${JSON.stringify(opts.outputSchema, null, 2)}\n\`\`\``,
      );
    } else {
      parts.push(`Format: ${params.format.toUpperCase()}`);
    }

    if (params.paragraphFlow) parts.push(`Flow: ${params.paragraphFlow}`);
    if (params.sentenceStructure)
      parts.push(`Syntax: ${params.sentenceStructure}`);
    if (params.listStyle) parts.push(`Lists: ${params.listStyle}`);
    if (params.headingHierarchy)
      parts.push(`Structure: Hierarchical headings enabled`);
    if (params.tone) parts.push(`Tone: ${params.tone}`);
    if (params.emotionalIntensity)
      parts.push(`Emotional Intensity: ${params.emotionalIntensity}/10`);
    if (params.persuasionTechnique)
      parts.push(`Rhetoric: ${params.persuasionTechnique}`);

    if (parts.length > 0)
      this.addSection(buffer, 'structure', opts, parts.join('\n'));
  }

  /**
   * Builds operations section with generation parameters and limits.
   * Configures creativity, refinement iterations, length, tokens, and language.
   *
   * @example
   * ```typescript
   * const buffer: string[] = [];
   * const params = {
   *   responseLength: 'detailed',
   *   maxTokens: 2000,
   *   language: 'English',
   *   // ... other params
   * };
   * const opts = {
   *   creativityLevel: 'creative',
   *   enableProgressiveRefinement: true,
   *   maxRefinementIterations: 5,
   *   verbosity: 'explanatory'
   * };
   * this.buildOperationsSection(buffer, params, opts);
   * // Adds operations with refinement protocol
   * ```
   */
  private static buildOperationsSection(
    buffer: string[],
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): void {
    this.debugLog(buffer, 'BUILDING OPERATIONS SECTION', opts.debugMode);
    const parts: string[] = [];

    if (opts.creativityLevel) {
      const map = {
        conservative:
          'Prioritize accuracy and common patterns. Avoid speculation.',
        balanced: 'Balance between factual accuracy and creative expression.',
        creative:
          'Prioritize novelty, unique perspectives, and diverse outputs.',
      };
      parts.push(`Creativity: ${map[opts.creativityLevel]}`);
    }

    if (opts.enableProgressiveRefinement) {
      const limit = opts.maxRefinementIterations || 3;
      const instruction =
        opts.verbosity === 'terse'
          ? `Refinement: Iterate up to ${limit} times.`
          : `**Refinement Protocol:** After generating an initial response, critically evaluate it against the constraints and improve it. Repeat this process up to ${limit} times or until quality is maximal.`;
      parts.push(instruction);
    }

    if (params.responseLength) {
      const key =
        typeof params.responseLength === 'string'
          ? params.responseLength
          : params.responseLength.key;
      const map = {
        brief: 'Concise',
        medium: 'Moderate',
        detailed: 'Comprehensive',
      };
      parts.push(`Length: ${map[key as keyof typeof map] || key}`);
    }

    if (params.maxTokens) parts.push(`Token Limit: ${params.maxTokens}`);
    if (params.minimalOutput)
      parts.push(`Style: Minimal (No filler, pure content)`);
    if (params.stopSequences?.length)
      parts.push(
        `Stop Sequences: [${params.stopSequences.map((s) => `"${s}"`).join(', ')}]`,
      );
    if (params.language) parts.push(`Language: ${params.language}`);
    if (params.encoding) parts.push(`Encoding: ${params.encoding}`);

    if (parts.length > 0)
      this.addSection(buffer, 'operations', opts, parts.join('\n'));
  }

  /**
   * Builds special instructions section for custom directives.
   * Adds any user-provided custom instructions as a dedicated section.
   *
   * @example
   * ```typescript
   * const buffer: string[] = [];
   * const params = {
   *   customInstructions: 'Always cite sources. Use APA format.'
   * };
   * this.buildSpecialInstructionsSection(buffer, params, {} as any);
   * // Adds special instructions section with custom text
   * ```
   */
  private static buildSpecialInstructionsSection(
    buffer: string[],
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): void {
    this.debugLog(buffer, 'BUILDING SPECIAL INSTRUCTIONS', opts.debugMode);
    if (params.customInstructions) {
      this.addSection(buffer, 'special', opts, params.customInstructions!);
    }
  }

  /**
   * Builds the payload section containing the actual user input.
   * Always added last, formatted based on verbosity level.
   *
   * @example
   * ```typescript
   * const buffer: string[] = [];
   * const params = { text: 'Explain quantum computing' };
   * const opts = { verbosity: 'standard', reasoningStyle: 'step-by-step' };
   * this.buildPayloadSection(buffer, params, opts);
   * // Adds payload with reasoning protocol reference
   * ```
   */
  private static buildPayloadSection(
    buffer: string[],
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): void {
    this.debugLog(buffer, 'BUILDING PAYLOAD', opts.debugMode);
    const content =
      opts.verbosity === 'terse'
        ? `Input:\n"${params.text}"`
        : `Process${opts.reasoningStyle ? ' using the defined reasoning protocol' : ''} the following input based on directives above:\n"""\n${params.text}\n"""`;
    this.addSection(buffer, 'payload', opts, content, false);
  }

  /**
   * Builds metadata section with session and provider information.
   * Only added when includeMetadata flag is enabled in params.
   *
   * @example
   * ```typescript
   * const buffer: string[] = [];
   * const params = {
   *   includeMetadata: true,
   *   provider: 'OpenAI',
   *   model: 'gpt-4',
   *   conversationId: 'conv-123',
   *   offTheRecord: true
   * };
   * const opts = { debugMode: false };
   * this.buildMetadataSection(buffer, params, opts);
   * // Adds metadata with provider, model, security flag, and conversation ID
   * ```
   */
  private static buildMetadataSection(
    buffer: string[],
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): void {
    if (params.includeMetadata) {
      this.debugLog(buffer, 'BUILDING METADATA', opts.debugMode);
      const meta: string[] = [];
      meta.push(`Provider: ${params.provider || 'Unknown'}`);
      meta.push(`Model: ${params.model || 'Unknown'}`);
      meta.push(`Time: ${params.timestamp || new Date().toISOString()}`);
      if (params.offTheRecord) meta.push(`SECURE: OFF-THE-RECORD`);
      if (params.conversationId)
        meta.push(`Conversation ID: ${params.conversationId}`);

      this.addSection(buffer, 'metadata', opts, meta.join('\n'));
    }
  }

  // ==========================================
  // HELPER METHODS (Refactored)
  // ==========================================

  /**
   * Helper to log debug messages if debug mode is on.
   * Adds formatted debug messages directly to the buffer when condition is true.
   *
   * @example
   * ```typescript
   * const buffer: string[] = [];
   * this.debugLog(buffer, 'Starting process', true);  // Adds [DEBUG] Starting process
   * this.debugLog(buffer, 'Skipped', false);          // Does nothing
   * ```
   */
  private static debugLog(
    buffer: string[],
    message: string,
    condition?: boolean,
  ): void {
    if (condition) buffer.push(`[DEBUG] ${message}`);
  }

  /**
   * Extracts role details from params, handling both string and object formats.
   * Parses userRole to extract name, traits, and system prompt for identity section.
   *
   * @example
   * ```typescript
   * // String role
   * const params1 = { userRole: 'Assistant', systemPrompt: 'Helpful AI' };
   * const role1 = this.resolveRoleData(params1, { verbosity: 'standard' });
   * // { roleName: 'Assistant', roleTraits: [], roleSystemPrompt: 'Helpful AI' }
   *
   * // Object role with full details
   * const params2 = {
   *   userRole: {
   *     name: 'Expert',
   *     expertiseLevel: 'Senior',
   *     tone: ['Professional'],
   *     capabilities: ['Coding', 'Analysis']
   *   }
   * };
   * const role2 = this.resolveRoleData(params2, { verbosity: 'standard' });
   * // role2.roleTraits contains expertise, tone, and capabilities
   * ```
   */
  private static resolveRoleData(
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): {
    roleName: string;
    roleTraits: string[];
    roleSystemPrompt: string;
  } {
    let roleName = '';
    let roleSystemPrompt = params.systemPrompt || '';
    const roleTraits: string[] = [];

    if (params.userRole) {
      if (typeof params.userRole === 'string') {
        roleName = params.userRole;
        if (params.enhancementParameters?.personaTraits) {
          roleTraits.push(
            ...(params.enhancementParameters.personaTraits as string[]),
          );
        }
      } else {
        const roleObj = params.userRole;
        roleName = roleObj.name;
        roleSystemPrompt = roleObj.systemPrompt || roleSystemPrompt;
        if (roleObj.expertiseLevel) roleTraits.push(roleObj.expertiseLevel);
        if (roleObj.tone?.length) roleTraits.push(roleObj.tone.join(', '));
        if (roleObj.capabilities?.length)
          roleTraits.push(`Skills: ${roleObj.capabilities.join(', ')}`);
        if (roleObj.category && opts.verbosity !== 'terse')
          roleTraits.push(`Category: ${roleObj.category}`);
      }
    }

    return { roleName, roleTraits, roleSystemPrompt };
  }

  /**
   * Formats the audience section based on verbosity level.
   * Returns null if no audience specified, string for terse, detailed object for standard.
   *
   * @example
   * ```typescript
   * // No audience
   * this.formatAudience({}, opts); // null
   *
   * // String audience (terse)
   * this.formatAudience({ targetAudience: 'Beginners' }, { verbosity: 'terse' });
   * // 'Audience: Beginners'
   *
   * // Object audience (standard)
   * this.formatAudience(
   *   { targetAudience: { label: 'Experts', summary: 'Senior developers', tags: ['tech'] } },
   *   { verbosity: 'explanatory' }
   * );
   * // '**Target Audience:** Experts\n- **Context:** Senior developers\n- **Tags:** tech'
   * ```
   */
  private static formatAudience(
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): string | null {
    if (!params.targetAudience) return null;

    if (typeof params.targetAudience === 'string') {
      return `Audience: ${params.targetAudience}`;
    }

    const aud = params.targetAudience;
    if (opts.verbosity === 'terse') {
      return `Audience: ${aud.label}`;
    }

    let content = `**Target Audience:** ${aud.label}`;
    if (opts.verbosity === 'explanatory') {
      content += `\n- **Context:** ${aud.summary}`;
      if (aud.tags?.length) content += `\n- **Tags:** ${aud.tags.join(', ')}`;
    }
    return content;
  }

  /**
   * Resolves task type from enhancementType parameter.
   * Handles both string and object formats for enhancement type specification.
   *
   * @example
   * ```typescript
   * this.resolveTaskType({ enhancementType: 'summarization' }); // 'summarization'
   * this.resolveTaskType({ enhancementType: { name: 'analysis', priority: 'high' } }); // 'analysis'
   * this.resolveTaskType({}); // ''
   * ```
   */
  private static resolveTaskType(params: PromptParamsNormalized): string {
    return typeof params.enhancementType === 'string'
      ? params.enhancementType
      : params.enhancementType?.name || '';
  }

  /**
   * Formats the Skills section of the Experience block.
   * Outputs comma-separated for terse, detailed list with proficiency for standard.
   *
   * @example
   * ```typescript
   * const parts: string[] = [];
   * const params = {
   *   skills: ['TypeScript', 'Python'],
   *   skillProficiency: { TypeScript: 9, Python: 7 }
   * };
   * this.appendSkillsSection(parts, params, { verbosity: 'standard' });
   * // parts now contains bullet list with proficiency ratings
   * ```
   */
  private static appendSkillsSection(
    parts: string[],
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): void {
    if (params.skills?.length) {
      if (opts.verbosity === 'terse') {
        parts.push(`- **Skills:** ${params.skills.join(', ')}`);
      } else {
        parts.push(`- **Core Competencies:**`);
        params.skills.forEach((skill) => {
          const proficiency = params.skillProficiency
            ? params.skillProficiency[skill]
            : null;
          const suffix = proficiency !== null ? ` (${proficiency}/10)` : '';
          parts.push(`  - ${skill}${suffix}`);
        });
      }
    }
  }

  /**
   * Formats the Calibration Metrics section of the Experience block.
   * Shows percentage values for context sensitivity, adaptability, critical and creative thinking.
   * Only included in non-terse verbosity modes.
   *
   * @example
   * ```typescript
   * const parts: string[] = [];
   * const params = {
   *   contextSensitivity: 0.85,
   *   adaptability: 0.72,
   *   criticalThinking: 0.90,
   *   creativeThinking: 0.65
   * };
   * this.appendCalibrationSection(parts, params, { verbosity: 'standard' });
   * // parts contains: '- **Internal Calibration:** [ Context: 85% | Adaptability: 72% | ... ]'
   * ```
   */
  private static appendCalibrationSection(
    parts: string[],
    params: PromptParamsNormalized,
    opts: PromptGeneratorOptions,
  ): void {
    if (opts.verbosity === 'terse') return;

    const metrics: string[] = [];
    if (params.contextSensitivity)
      metrics.push(`Context: ${Math.round(params.contextSensitivity * 100)}%`);
    if (params.adaptability)
      metrics.push(`Adaptability: ${Math.round(params.adaptability * 100)}%`);
    if (params.criticalThinking)
      metrics.push(
        `Criticality: ${Math.round(params.criticalThinking * 100)}%`,
      );
    if (params.creativeThinking)
      metrics.push(`Creativity: ${Math.round(params.creativeThinking * 100)}%`);

    if (metrics.length > 0) {
      parts.push(`- **Internal Calibration:** [ ${metrics.join(' | ')} ]`);
    }
  }

  /**
   * Generates reasoning instruction text based on style and verbosity.
   * Creates descriptive instructions for chain-of-thought and other reasoning approaches.
   *
   * @example
   * ```typescript
   * this.getReasoningInstruction('step-by-step', 'explanatory');
   * // 'To ensure high quality, you will use step-by-step reasoning. Break down into sequential steps.'
   *
   * this.getReasoningInstruction('first-principles', 'terse');
   * // 'Deconstruct to fundamental truths.'
   * ```
   */
  private static getReasoningInstruction(
    style: string,
    verbosity?: string,
  ): string {
    const baseInstruction =
      verbosity === 'explanatory'
        ? `To ensure high quality, you will use ${style} reasoning. `
        : '';

    const specifics =
      this.MAPPINGS.reasoning[style as keyof typeof this.MAPPINGS.reasoning] ||
      '';

    if (verbosity === 'explanatory') {
      // Enhancements for explanatory mode could be added here
      return baseInstruction + specifics;
    }

    return specifics;
  }

  /**
   * Adds a section to the buffer with appropriate headers/formatting.
   * Handles XML tags, plain text brackets, or Markdown headers based on formatStyle.
   * Optionally skips empty sections.
   *
   * @example
   * ```typescript
   * const buffer: string[] = [];
   *
   * // Markdown format (default)
   * this.addSection(buffer, 'identity', { formatStyle: 'markdown' }, 'Role: Assistant');
   * // Adds: '\n### SYSTEM IDENTITY\nRole: Assistant\n'
   *
   * // XML format
   * this.addSection(buffer, 'identity', { formatStyle: 'xml' }, 'Role: Assistant');
   * // Adds: '\n<system_identity>\nRole: Assistant\n</system_identity>\n'
   *
   * // Plain format
   * this.addSection(buffer, 'identity', { formatStyle: 'plain' }, 'Role: Assistant');
   * // Adds: '\n[ SYSTEM IDENTITY ]\nRole: Assistant\n'
   * ```
   */
  private static addSection(
    buffer: string[],
    key: CustomLabel,
    options: PromptGeneratorOptions,
    content: string,
    omitIfEmpty: boolean = true,
  ): void {
    if (omitIfEmpty && !content.trim()) return;

    const label = String(
      options?.customLabels?.[key] || this.DEFAULT_LABELS[key],
    );
    let header: string;

    if (options.formatStyle === 'xml') {
      header = `<${label.toLowerCase().replace(/\s+/g, '_')}>`;
    } else if (options.formatStyle === 'plain') {
      header = `[ ${label.toUpperCase()} ]`;
    } else {
      header = `### ${label}`;
    }

    buffer.push(`\n${header}`);
    buffer.push(content);

    if (options.formatStyle === 'xml') {
      buffer.push(`</${label.toLowerCase().replace(/\s+/g, '_')}>`);
    }
    buffer.push('');
  }

  /**
   * Final formatting of the output buffer.
   * Applies format-specific transformations (markdown, xml, plain) and cleans up whitespace.
   *
   * @example
   * ```typescript
   * const buffer = ['### IDENTITY', 'Role: AI', '', '', '### TASK', 'Process this'];
   * const result = this.formatOutput(buffer, { formatStyle: 'markdown' });
   * // Converts ### to ##, collapses multiple newlines
   *
   * const plain = this.formatOutput(buffer, { formatStyle: 'plain' });
   * // Removes markdown formatting, uses bracket headers
   * ```
   */
  private static formatOutput(
    buffer: string[],
    options: PromptGeneratorOptions,
  ): string {
    let output = buffer.join('\n');
    output = output.replace(/\n{3,}/g, '\n\n');

    // Apply format-specific transformations based on options
    switch (options.formatStyle) {
      case 'xml':
        output = output.replace(/^###\s+(.+)$/gm, (match, p1) => {
          const tag = p1
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '_')
            .trim();
          return `<${tag}>`;
        });
        break;
      case 'plain':
        output = output.replace(/^###\s+(.+)$/gm, (match, p1) => {
          return `\n[ ${p1.toUpperCase()} ]\n`;
        });
        output = output.replace(/\*\*(.*?)\*\*/g, '$1');
        output = output.replace(/\*(.*?)\*/g, '$1');
        output = output.replace(/```[\w]*\n([\s\S]*?)```/g, '$1');
        output = output.replace(/`([^`]+)`/g, '$1');
        break;
      case 'markdown':
      default:
        output = output.replace(/^###\s+/gm, '## ');
        output = output.replace(/```(\w*)\n/g, '```$1\n');
        break;
    }

    return output.trim();
  }

  // ==========================================
  // EXPORTERS
  // ==========================================

  /**
   * Converts a generated prompt to plain text format.
   * Strips all markdown, XML tags, code blocks, and extra formatting.
   * Useful for contexts that require raw text without formatting.
   *
   * @example
   * ```typescript
   * const markdownPrompt = '### IDENTITY\n**Role:** AI\n```code\nconst x = 1;\n```';
   * const plain = UniversalPromptComposer.toPlainText(markdownPrompt);
   * // Returns: '[ IDENTITY ]\nRole: AI\nconst x = 1;'
   * ```
   */
  public static toPlainText(prompt: string): string {
    let plainText = prompt;
    plainText = plainText.replace(/^###\s+(.+)$/gm, (match, p1) => {
      return `\n[ ${p1.toUpperCase()} ]\n`;
    });
    plainText = plainText.replace(/\*\*(.*?)\*\*/g, '$1');
    plainText = plainText.replace(/\*(.*?)\*/g, '$1');
    plainText = plainText.replace(/```[\w]*\n([\s\S]*?)```/g, '$1');
    plainText = plainText.replace(/`([^`]+)`/g, '$1');
    plainText = plainText.replace(/<[^>]+>/g, '');
    plainText = plainText.replace(/\n{3,}/g, '\n\n');
    return plainText.trim();
  }

  /**
   * Normalizes a prompt to standard Markdown format.
   * Converts level 3 headers to level 2 and cleans up whitespace.
   *
   * @example
   * ```typescript
   * const mixedPrompt = '### Section\nContent here.\n\n\nMore content.';
   * const markdown = UniversalPromptComposer.toMarkdown(mixedPrompt);
   * // Returns: '## Section\nContent here.\n\nMore content.'
   * ```
   */
  public static toMarkdown(prompt: string): string {
    let markdown = prompt.replace(/^###\s+/gm, '## ');
    markdown = markdown.replace(/```(\w*)\n/g, '```$1\n');
    markdown = markdown.replace(/\n{3,}/g, '\n\n');
    return markdown.trim();
  }

  /**
   * Converts a prompt to XML format with proper tag structure.
   * Wraps content in XML declaration and prompt root element.
   * Converts headers to XML tags and ensures proper closing tags.
   *
   * @example
   * ```typescript
   * const markdownPrompt = '### IDENTITY\nRole: AI\n### TASK\nProcess this';
   * const xml = UniversalPromptComposer.toXML(markdownPrompt);
   * // Returns: '<?xml version="1.0" encoding="UTF-8"?>\n<prompt>\n<identity>\nRole: AI\n</identity>\n<task>\nProcess this\n</task>\n</prompt>'
   * ```
   */
  public static toXML(prompt: string): string {
    // If already XML style, just wrap and validate
    if (prompt.includes('<?xml')) {
      return prompt;
    }

    // Convert Markdown to XML
    let xml = prompt;

    // Convert headers to tags
    xml = xml.replace(/^#+\s+(.+)$/gm, (_match, p1) => {
      const tag = p1
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .trim();
      return `<${tag}>`;
    });

    // Close tags (simple heuristic: next header or end)
    const lines = xml.split('\n');
    const result: string[] = [];
    let openTag: string | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const match = line.match(/^<([a-z_]+)>$/);

      if (match) {
        if (openTag) {
          result.push(`</${openTag}>`);
        }
        openTag = match[1].replace(/_+/g, '_');
        result.push(line);
      } else {
        result.push(line);
      }
    }

    if (openTag) {
      result.push(`</${openTag}>`);
    }

    xml = result.join('\n');

    // Wrap in root
    return `<?xml version="1.0" encoding="UTF-8"?>\n<prompt>\n${xml}\n</prompt>`;
  }
}
