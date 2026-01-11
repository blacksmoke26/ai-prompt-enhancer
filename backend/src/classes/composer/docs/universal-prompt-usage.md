
### List of Example Scenarios

Below are various scenarios demonstrating how to use the refactored class with the new `options` parameter.

#### 1. The "Strict Data Extractor" (JSON + Schema + Terse)
*Use case:* Reliably extracting structured data from unstructured text.

```typescript
const prompt = UniversalPromptComposer.generate({
  text: "John bought 5 apples for $10 yesterday.",
  systemPrompt: "Extract data only.",
  format: "json",
  userRole: "DataExtractor",
  enhancementType: "extract",
}, {
  verbosity: "terse",
  formatStyle: "plain",
  outputSchema: {
    type: "object",
    properties: {
      person: { type: "string" },
      item: { type: "string" },
      price: { type: "number" }
    }
  },
  negativeConstraints: ["No explanations", "No markdown"]
});

/* Output:
[ INPUT PAYLOAD ]
Input: "John bought 5 apples for $10 yesterday."
*/
```

#### 2. The "Mentor" (Explanatory + Step-by-Step Reasoning)
*Use case:* Teaching a complex concept to a student.

```typescript
const prompt = UniversalPromptComposer.generate({
  text: "How does a blockchain work?",
  systemPrompt: "You are a patient teacher.",
  format: "markdown",
  userRole: "Tutor",
  enhancementType: "explain",
  cognitiveLoad: "low",
  metaphorUsage: "heavy"
}, {
  verbosity: "explanatory",
  reasoningStyle: "step-by-step",
  chainOfThoughtPrefix: "Let's break this down:",
  reasoningVisibility: "visible"
});

/* Output:
### COGNITIVE ARCHITECTURE
- Protocol: Break down into sequential steps.
- Trigger: "Let's break this down:"
...
*/
```

#### 3. The "Creative Ad Writer" (Few-Shot Learning)
*Use case:* Generating catchy headlines based on past successful ads.

```typescript
const prompt = UniversalPromptComposer.generate({
  text: "A new coffee shop opens downtown.",
  systemPrompt: "Marketing genius.",
  format: "text",
  userRole: "Copywriter",
  enhancementType: "rewrite"
}, {
  fewShotExamples: [
    { input: "New shoes available", output: "Walk on Clouds: The New Collection is Here" },
    { input: "Summer sale", output: "Sizzle in the Sun: Prices Dropped Like Ice" }
  ],
  tone: "enthusiastic",
  emotionalIntensity: 9
});
```

#### 4. The "Programmatic Agent" (XML Formatting + Hidden Reasoning)
*Use case:* An LLM used as a backend service where you only want the final JSON, but you need it to think hard first (hidden in tags).

```typescript
const prompt = UniversalPromptComposer.generate({
  text: "Calculate the ROI for Project X based on...",
  systemPrompt: "Financial Analyst Bot.",
  format: "json",
  userRole: "Analyst",
  enhancementType: "calculate"
}, {
  formatStyle: "xml",
  reasoningStyle: "first-principles",
  reasoningVisibility: "hidden",
  debugMode: true
});

/* Output:
<system_identity>
...
</system_identity>

<cognitive_architecture>
- Protocol: Deconstruct to fundamental truths. (Encapsulate in <thought> tags)
[DEBUG] Reasoning set to hidden mode.
</cognitive_architecture>
...
*/
```
