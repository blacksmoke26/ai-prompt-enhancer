/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {
  Activity,
  ArrowRightLeft,
  ArrowUpCircle,
  Atom,
  Award,
  BadgeCheck,
  BarChart2,
  BookOpen,
  Braces,
  Brain,
  BrainCircuit,
  Briefcase,
  CalendarClock,
  CalendarDays,
  Camera,
  ChartArea,
  CircuitBoard,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Cloud,
  Code2,
  Coins,
  Combine,
  Cpu,
  Dna,
  EyeOff,
  FileSearch,
  Fingerprint,
  FlaskConical,
  Focus,
  FunctionSquare,
  Gauge,
  Globe,
  GraduationCap,
  Grid3x3,
  HandHeart,
  Handshake,
  HardDrive,
  Hash,
  Heading,
  Heading1,
  HeartPulse,
  Infinity as InfinityIcon,
  Info,
  Languages,
  Layers,
  Layout,
  LayoutTemplate,
  Leaf,
  Lightbulb,
  List,
  ListOrdered,
  LucideIcon,
  Map as MapIcon,
  MessageSquare,
  MessageSquareQuote,
  MessagesSquare,
  Minimize,
  Minimize2,
  Monitor,
  Network,
  Palette,
  PenLine,
  PenTool,
  Percent,
  Puzzle,
  Quote,
  Radar,
  Ruler,
  Scale,
  Scroll,
  SearchCheck,
  Server,
  Shapes,
  ShieldCheck,
  Shuffle,
  Signature,
  Sliders,
  Star,
  StopCircle,
  Tag,
  Target,
  TerminalSquare,
  Thermometer,
  Timer,
  TreePine,
  TrendingDown,
  Type,
  User,
  UserCircle,
  Users,
  UsersRound,
  Waves,
  Workflow,
  Wrench,
  Zap,
  ZoomIn,
} from 'lucide-react';

// components
import EnhancementTypeSelector from './PromptActions/controls/EnhancementTypeSelector';
import CustomInstructionsInput from './PromptActions/controls/CustomInstructionsInput';
import EnhancementParametersInput from './PromptActions/controls/EnhancementParametersInput';
import ExperienceInput from './PromptActions/controls/ExperienceInput';
import TemperatureSlider from './PromptActions/controls/TemperatureSlider';
import MaxTokensInput from './PromptActions/controls/MaxTokensInput';
import TopKInput from './PromptActions/controls/TopKInput';
import TopPInput from './PromptActions/controls/TopPInput';
import ResponseLengthInput from './PromptActions/controls/ResponseLengthInput';
import FormatInput from './PromptActions/controls/FormatInput';
import OffTheRecordToggle from './PromptActions/controls/OffTheRecordToggle';
import ProviderStatus from './PromptActions/controls/ProviderStatus';
import EconomicDetailInput from './PromptActions/controls/EconomicDetailInput';
import FrequencyPenaltyInput from './PromptActions/controls/FrequencyPenaltyInput';
import PresencePenaltyInput from './PromptActions/controls/PresencePenaltyInput';
import StopSequencesInput from './PromptActions/controls/StopSequencesInput';
import TargetAudienceInput from './PromptActions/controls/TargetAudienceInput';
import ToneInput from './PromptActions/controls/ToneInput';
import AmbiguityTolerance from './PromptActions/controls/AmbiguityTolerance';
import ArgumentationStyle from './PromptActions/controls/ArgumentationStyle';
import ArtisticDetail from './PromptActions/controls/ArtisticDetail';
import AbstractionLevel from './PromptActions/controls/AbstractionLevel';
import AcquisitionSpeed from './PromptActions/controls/AcquisitionSpeed';
import Adaptability from './PromptActions/controls/Adaptability';
import AnalyticalThinking from './PromptActions/controls/AnalyticalThinking';
import LateralThinking from './PromptActions/controls/LateralThinking';
import LearningCurve from './PromptActions/controls/LearningCurve';
import MathematicalDetail from './PromptActions/controls/MathematicalDetail';
import NarrativePerspective from './PromptActions/controls/NarrativePerspective';
import ParagraphFlow from './PromptActions/controls/ParagraphFlow';
import TechnicalDepth from './PromptActions/controls/TechnicalDepth';
import DataGranularity from './PromptActions/controls/DataGranularity';
import DetailLevel from './PromptActions/controls/DetailLevel';
import EnvironmentalDetail from './PromptActions/controls/EnvironmentalDetail';
import ExampleSpecificity from './PromptActions/controls/ExampleSpecificity';
import GeographicScope from './PromptActions/controls/GeographicScope';
import HistoricalDepth from './PromptActions/controls/HistoricalDepth';
import InformationDensity from './PromptActions/controls/InformationDensity';
import SentenceStructure from './PromptActions/controls/SentenceStructure';
import TemporalScope from './PromptActions/controls/TemporalScope';
import ThinkingPattern from './PromptActions/controls/ThinkingPattern';
import TimeHorizon from './PromptActions/controls/TimeHorizon';
import VisualComplexity from './PromptActions/controls/VisualComplexity';
import TechnicalJargonLevel from './PromptActions/controls/TechnicalJargonLevel';
import TechnologicalDetail from './PromptActions/controls/TechnologicalDetail';
import MinimalOutput from './PromptActions/controls/MinimalOutput';
import CognitiveLoad from './PromptActions/controls/CognitiveLoad';
import ChemicalDetail from './PromptActions/controls/ChemicalDetail';
import BiologicalDetail from './PromptActions/controls/BiologicalDetail';
import PhysicsDetail from './PromptActions/controls/PhysicsDetail';
import WritingStyle from './PromptActions/controls/WritingStyle';
import SocialDetail from './PromptActions/controls/SocialDetail';
import ListStyle from './PromptActions/controls/ListStyle';
import Skills from './PromptActions/controls/Skills';
import Language from './PromptActions/controls/Language';
import Encoding from './PromptActions/controls/Encoding';
import Strictness from './PromptActions/controls/Strictness';
import IncludeMetadata from './PromptActions/controls/IncludeMetadata';
import MetaphorUsage from './PromptActions/controls/MetaphorUsage';
import HeadingHierarchy from './PromptActions/controls/HeadingHierarchy';
import EmotionalIntensity from './PromptActions/controls/EmotionalIntensity';
import PersuasionTechnique from './PromptActions/controls/PersuasionTechnique';
import EmpathyLevel from './PromptActions/controls/EmpathyLevel';
import CulturalContext from './PromptActions/controls/CulturalContext';
import DomainSpecificity from './PromptActions/controls/DomainSpecificity';
import RegulatoryCompliance from './PromptActions/controls/RegulatoryCompliance';
import KnowledgeDepth from './PromptActions/controls/KnowledgeDepth';
import KnowledgeBreadth from './PromptActions/controls/KnowledgeBreadth';
import ReasoningDepth from './PromptActions/controls/ReasoningDepth';
import SystemsThinking from './PromptActions/controls/SystemsThinking';
import CriticalThinking from './PromptActions/controls/CriticalThinking';
import CrossDomainTransfer from './PromptActions/controls/CrossDomainTransfer';
import ExperienceLevel from './PromptActions/controls/ExperienceLevel';
import DomainExpertise from './PromptActions/controls/DomainExpertise';
import ProblemSolvingApproach from './PromptActions/controls/ProblemSolvingApproach';
import SkillProficiency from './PromptActions/controls/SkillProficiency';
import ExpertiseFocus from './PromptActions/controls/ExpertiseFocus';
import DomainSpecialization from './PromptActions/controls/DomainSpecialization';
import RetentionRate from './PromptActions/controls/RetentionRate';
import PatternRecognitionSensitivity from './PromptActions/controls/PatternRecognitionSensitivity';
import ContextSensitivity from './PromptActions/controls/ContextSensitivity';
import CreativeThinking from './PromptActions/controls/CreativeThinking';
import ExperientialLearning from './PromptActions/controls/ExperientialLearning';
import TheoreticalUnderstanding from './PromptActions/controls/TheoreticalUnderstanding';
import PracticalApplication from './PromptActions/controls/PracticalApplication';
import SynthesisCapability from './PromptActions/controls/SynthesisCapability';
import EvaluationCapability from './PromptActions/controls/EvaluationCapability';

// types
import type {VisibleComponents} from '~/types';

export const providerIcons: Record<string, LucideIcon> = {
  // ==========================================
  // 1. Core Configuration & Setup
  // ==========================================
  text: MessageSquare,
  systemPrompt: TerminalSquare,
  provider: Cloud,
  model: Cpu,
  userRole: UserCircle,
  enhancementType: Type,
  customInstructions: ClipboardList,
  enhancementParameters: Sliders,

  // ==========================================
  // 2. Generation Behavior (LLM Parameters)
  // ==========================================
  temperature: Thermometer,
  maxTokens: Hash,
  topP: Percent,
  topK: ListOrdered,
  stopSequences: StopCircle,
  frequencyPenalty: TrendingDown,
  presencePenalty: Minimize2,

  // ==========================================
  // 3. Output Constraints & Formatting
  // ==========================================
  format: LayoutTemplate,
  responseLength: Ruler,
  language: Languages,
  encoding: Braces,
  strictness: Scale,
  minimalOutput: Minimize,
  includeMetadata: Info,

  // ==========================================
  // 4. Cognitive & Semantic Structure
  // ==========================================
  cognitiveLoad: Gauge,
  informationDensity: FileSearch,
  abstractionLevel: ArrowUpCircle,
  metaphorUsage: Signature,
  sentenceStructure: Heading1,
  paragraphFlow: Waves,
  listStyle: List,
  headingHierarchy: Heading,

  // ==========================================
  // 5. Emotional & Persuasive Tone
  // ==========================================
  tone: MessageSquareQuote,
  emotionalIntensity: HeartPulse,
  persuasionTechnique: Handshake,
  empathyLevel: HandHeart,

  // ==========================================
  // 6. Domain & Contextual Scope
  // ==========================================
  targetAudience: UsersRound,
  culturalContext: Globe,
  domainSpecificity: Target,
  technicalJargonLevel: Code2,
  regulatoryCompliance: ShieldCheck,

  // ==========================================
  // 7. Knowledge, Reasoning & Thinking Patterns
  // ==========================================
  knowledgeDepth: BrainCircuit,
  knowledgeBreadth: Network,
  reasoningDepth: TreePine,
  thinkingPattern: Workflow,
  problemSolvingApproach: Puzzle,
  systemsThinking: CircuitBoard,
  criticalThinking: SearchCheck,
  crossDomainTransfer: ArrowRightLeft,
  lateralThinking: Lightbulb,

  // ==========================================
  // 8. Expertise, Skills & Learning
  // ==========================================
  experience: Timer,
  experienceLevel: Award,
  timeHorizon: CalendarClock,
  domainExpertise: GraduationCap,
  skills: Star,
  skillProficiency: Gauge,
  expertiseFocus: Target,
  domainSpecialization: Tag,
  learningCurve: ChartArea,
  retentionRate: HardDrive,
  acquisitionSpeed: Zap,

  // ==========================================
  // 9. Sensitivity & Adaptivity
  // ==========================================
  patternRecognitionSensitivity: Radar,
  contextSensitivity: Focus,
  adaptability: ArrowRightLeft,
  ambiguityTolerance: Shuffle,

  // ==========================================
  // 10. Core Thinking Capabilities
  // ==========================================
  creativeThinking: PenTool,
  analyticalThinking: BarChart2,
  experientialLearning: BadgeCheck,
  theoreticalUnderstanding: BookOpen,
  practicalApplication: Wrench,
  synthesisCapability: Combine,
  evaluationCapability: ClipboardCheck,

  // ==========================================
  // 11. Session & Metadata
  // ==========================================
  status: Activity,
  timestamp: Clock,
  conversationId: MessagesSquare,
  offTheRecord: EyeOff,

  // ==========================================
  // 12. Specialized Detail & Granularity
  // ==========================================

  // Scientific & Mathematical Details
  biologicalDetail: Dna,
  chemicalDetail: FlaskConical,
  mathematicalDetail: FunctionSquare,
  physicsDetail: Atom,

  // Humanities & Social Details
  artisticDetail: Palette,
  philosophicalDetail: InfinityIcon,
  historicalDepth: Scroll,
  psychologicalDetail: Fingerprint,
  socialDetail: Users,
  narrativePerspective: Camera,

  // Business, Tech & Data Details
  economicDetail: Coins,
  technologicalDetail: Monitor,
  dataGranularity: Grid3x3,
  technicalDepth: Cpu,

  // Environmental & Spatial Details
  environmentalDetail: Leaf,
  geographicScope: MapIcon,

  // General Structural Details
  detailLevel: ZoomIn,
  exampleSpecificity: Quote,
  temporalScope: CalendarDays,
  visualComplexity: Shapes,
  argumentationStyle: Scale,
  writingStyle: PenLine,
};

export const componentsMaps: Record<string, { title: string; component: Function | null; }> = {
  enhancementType: {title: 'Enhancement Type', component: EnhancementTypeSelector},
  customInstructions: {title: 'Custom Instructions', component: CustomInstructionsInput},
  enhancementParameters: {title: 'Enhancement Parameters', component: EnhancementParametersInput},
  temperature: {title: 'Temperature', component: TemperatureSlider},
  maxTokens: {title: 'Max Tokens', component: MaxTokensInput},
  topP: {title: 'Top P', component: TopPInput},
  topK: {title: 'Top K', component: TopKInput},
  stopSequences: {title: 'Stop Sequences', component: StopSequencesInput},
  frequencyPenalty: {title: 'Frequency Penalty', component: FrequencyPenaltyInput},
  presencePenalty: {title: 'Presence Penalty', component: PresencePenaltyInput},
  format: {title: 'Output Format', component: FormatInput},
  responseLength: {title: 'Response Length', component: ResponseLengthInput},
  language: {title: 'Language', component: Language},
  encoding: {title: 'Encoding', component: Encoding},
  strictness: {title: 'Strictness', component: Strictness},
  minimalOutput: {title: 'Minimal Output', component: MinimalOutput},
  includeMetadata: {title: 'Include Metadata', component: IncludeMetadata},
  cognitiveLoad: {title: 'Cognitive Load', component: CognitiveLoad},
  informationDensity: {title: 'Information Density', component: InformationDensity},
  abstractionLevel: {title: 'Abstraction Level', component: AbstractionLevel},
  metaphorUsage: {title: 'Metaphor Usage', component: MetaphorUsage},
  sentenceStructure: {title: 'Sentence Structure', component: SentenceStructure},
  paragraphFlow: {title: 'Paragraph Flow', component: ParagraphFlow},
  listStyle: {title: 'List Style', component: ListStyle},
  headingHierarchy: {title: 'Heading Hierarchy', component: HeadingHierarchy},
  tone: {title: 'Tone', component: ToneInput},
  emotionalIntensity: {title: 'Emotional Intensity', component: EmotionalIntensity},
  persuasionTechnique: {title: 'Persuasion Technique', component: PersuasionTechnique},
  empathyLevel: {title: 'Empathy Level', component: EmpathyLevel},
  targetAudience: {title: 'Target Audience', component: TargetAudienceInput},
  culturalContext: {title: 'Cultural Context', component: CulturalContext},
  domainSpecificity: {title: 'Domain Specificity', component: DomainSpecificity},
  technicalJargonLevel: {title: 'Technical Jargon Level', component: TechnicalJargonLevel},
  regulatoryCompliance: {title: 'Regulatory Compliance', component: RegulatoryCompliance},
  knowledgeDepth: {title: 'Knowledge Depth', component: KnowledgeDepth},
  knowledgeBreadth: {title: 'Knowledge Breadth', component: KnowledgeBreadth},
  reasoningDepth: {title: 'Reasoning Depth', component: ReasoningDepth},
  thinkingPattern: {title: 'Thinking Pattern', component: ThinkingPattern},
  problemSolvingApproach: {title: 'Problem Solving Approach', component: ProblemSolvingApproach},
  systemsThinking: {title: 'Systems Thinking', component: SystemsThinking},
  criticalThinking: {title: 'Critical Thinking', component: CriticalThinking},
  crossDomainTransfer: {title: 'Cross Domain Transfer', component: CrossDomainTransfer},
  lateralThinking: {title: 'Lateral Thinking', component: LateralThinking},
  experience: {title: 'Experience', component: ExperienceInput},
  experienceLevel: {title: 'Experience Level', component: ExperienceLevel},
  timeHorizon: {title: 'Time Horizon', component: TimeHorizon},
  domainExpertise: {title: 'Domain Expertise', component: DomainExpertise},
  skills: {title: 'Skills', component: Skills},
  skillProficiency: {title: 'Skill Proficiency', component: SkillProficiency},
  expertiseFocus: {title: 'Expertise Focus', component: ExpertiseFocus},
  domainSpecialization: {title: 'Domain Specialization', component: DomainSpecialization},
  learningCurve: {title: 'Learning Curve', component: LearningCurve},
  retentionRate: {title: 'Retention Rate', component: RetentionRate},
  acquisitionSpeed: {title: 'Acquisition Speed', component: AcquisitionSpeed},
  patternRecognitionSensitivity: {title: 'Pattern Recognition Sensitivity', component: PatternRecognitionSensitivity},
  contextSensitivity: {title: 'Context Sensitivity', component: ContextSensitivity},
  adaptability: {title: 'Adaptability', component: Adaptability},
  ambiguityTolerance: {title: 'Ambiguity Tolerance', component: AmbiguityTolerance},
  creativeThinking: {title: 'Creative Thinking', component: CreativeThinking},
  analyticalThinking: {title: 'Analytical Thinking', component: AnalyticalThinking},
  experientialLearning: {title: 'Experiential Learning', component: ExperientialLearning},
  theoreticalUnderstanding: {title: 'Theoretical Understanding', component: TheoreticalUnderstanding},
  practicalApplication: {title: 'Practical Application', component: PracticalApplication},
  synthesisCapability: {title: 'Synthesis Capability', component: SynthesisCapability},
  evaluationCapability: {title: 'Evaluation Capability', component: EvaluationCapability},

  // ==========================================
  // 11. Session & Metadata
  // ==========================================
  status: {title: 'Provider Status', component: ProviderStatus},
  /*timestamp: {title: '', component: null},
  conversationId: {title: '', component: null},*/
  offTheRecord: {title: 'Off the Record', component: OffTheRecordToggle},

  // ==========================================
  // 12. Specialized Detail & Granularity
  // ==========================================

  // Scientific & Mathematical Details
  biologicalDetail: {title: 'Biological Detail', component: BiologicalDetail},
  chemicalDetail: {title: 'Chemical Detail', component: ChemicalDetail},
  mathematicalDetail: {title: 'Mathematical Detail', component: MathematicalDetail},
  physicsDetail: {title: 'Physics Detail', component: PhysicsDetail},

  // Humanities & Social Details
  artisticDetail: {title: 'Artistic Detail', component: ArtisticDetail},
  philosophicalDetail: {title: '', component: null},
  historicalDepth: {title: 'Historical Depth', component: HistoricalDepth},
  psychologicalDetail: {title: '', component: null},
  socialDetail: {title: 'Social Detail', component: SocialDetail},
  narrativePerspective: {title: 'Narrative Perspective', component: NarrativePerspective},

  // Business, Tech & Data Details
  economicDetail: {title: 'Economic Detail', component: EconomicDetailInput},
  technologicalDetail: {title: 'Technological Detail', component: TechnologicalDetail},
  dataGranularity: {title: 'Data Granularity', component: DataGranularity},
  technicalDepth: {title: 'Technical Depth', component: TechnicalDepth},

  // Environmental & Spatial Details
  environmentalDetail: {title: 'Environmental Detail', component: EnvironmentalDetail},
  geographicScope: {title: 'Geographic Scope', component: GeographicScope},

  // General Structural Details
  detailLevel: {title: 'Detail Level', component: DetailLevel},
  exampleSpecificity: {title: 'Example Specificity', component: ExampleSpecificity},
  temporalScope: {title: 'Temporal Scope', component: TemporalScope},
  visualComplexity: {title: 'Visual Complexity', component: VisualComplexity},
  argumentationStyle: {title: 'Argumentation Style', component: ArgumentationStyle},
  writingStyle: {title: 'Writing Style', component: WritingStyle},
};

const PROFILE_ALL_FALSE = {
  enhancementType: false,
  customInstructions: false,
  enhancementParameters: false,
  temperature: false,
  maxTokens: false,
  topP: false,
  topK: false,
  stopSequences: false,
  frequencyPenalty: false,
  presencePenalty: false,
  format: false,
  responseLength: false,
  language: false,
  encoding: false,
  strictness: false,
  minimalOutput: false,
  includeMetadata: false,
  cognitiveLoad: false,
  informationDensity: false,
  abstractionLevel: false,
  metaphorUsage: false,
  sentenceStructure: false,
  paragraphFlow: false,
  listStyle: false,
  headingHierarchy: false,
  tone: false,
  emotionalIntensity: false,
  persuasionTechnique: false,
  empathyLevel: false,
  targetAudience: false,
  culturalContext: false,
  domainSpecificity: false,
  technicalJargonLevel: false,
  regulatoryCompliance: false,
  knowledgeDepth: false,
  knowledgeBreadth: false,
  reasoningDepth: false,
  thinkingPattern: false,
  problemSolvingApproach: false,
  systemsThinking: false,
  criticalThinking: false,
  crossDomainTransfer: false,
  lateralThinking: false,
  experience: false,
  experienceLevel: false,
  timeHorizon: false,
  domainExpertise: false,
  skills: false,
  skillProficiency: false,
  expertiseFocus: false,
  domainSpecialization: false,
  learningCurve: false,
  retentionRate: false,
  acquisitionSpeed: false,
  patternRecognitionSensitivity: false,
  contextSensitivity: false,
  adaptability: false,
  ambiguityTolerance: false,
  creativeThinking: false,
  analyticalThinking: false,
  experientialLearning: false,
  theoreticalUnderstanding: false,
  practicalApplication: false,
  synthesisCapability: false,
  evaluationCapability: false,
  status: false,
  offTheRecord: false,
  biologicalDetail: false,
  chemicalDetail: false,
  mathematicalDetail: false,
  physicsDetail: false,
  artisticDetail: false,
  philosophicalDetail: false,
  historicalDepth: false,
  psychologicalDetail: false,
  socialDetail: false,
  narrativePerspective: false,
  economicDetail: false,
  technologicalDetail: false,
  dataGranularity: false,
  technicalDepth: false,
  environmentalDetail: false,
  geographicScope: false,
  detailLevel: false,
  exampleSpecificity: false,
  temporalScope: false,
  visualComplexity: false,
  argumentationStyle: false,
  writingStyle: false,
};

export const VISIBILITY_PROFILES: Record<string, { label: string; desc: string; config: VisibleComponents }> = {
  minimalist: {
    label: 'Minimalist',
    desc: 'Only essential (Temp, Length and Enhancement)',
    config: {
      ...PROFILE_ALL_FALSE,
      enhancementType: true,
      temperature: true,
      responseLength: true,
    } as VisibleComponents,
  },
  creative: {
    label: 'Writer / Creative',
    desc: 'Focus on tone, audience, narrative, and creativity',
    config: {
      ...PROFILE_ALL_FALSE,
      temperature: true,
      maxTokens: true,
      targetAudience: true,
      tone: true,
      responseLength: true,
      customInstructions: true,
      emotionalIntensity: true,
      metaphorUsage: true,
      creativeThinking: true,
      lateralThinking: true,
      culturalContext: true,
      persuasionTechnique: true,
      language: true,
      narrativePerspective: true,
      sentenceStructure: true,
      paragraphFlow: true,
      artisticDetail: true,
    } as VisibleComponents,
  },
  coder: {
    label: 'Developer / Precision',
    desc: 'Technical precision, syntax, and model parameters',
    config: {
      ...PROFILE_ALL_FALSE,
      temperature: true,
      maxTokens: true,
      customInstructions: true,
      format: true,
      topP: true,
      topK: true,
      stopSequences: true,
      frequencyPenalty: true,
      presencePenalty: true,
      language: true,
      technicalJargonLevel: true,
      domainSpecificity: true,
      strictness: true,
      minimalOutput: true,
      encoding: true,
      domainExpertise: true,
      practicalApplication: true,
      technologicalDetail: true,
      technicalDepth: true,
    } as VisibleComponents,
  },
  analyst: {
    label: 'Data Analyst',
    desc: 'Structure, JSON output, data granularity, and logic',
    config: {
      ...PROFILE_ALL_FALSE,
      maxTokens: true,
      format: true,
      responseLength: true,
      customInstructions: true,
      informationDensity: true,
      strictness: true,
      minimalOutput: true,
      analyticalThinking: true,
      criticalThinking: true,
      evaluationCapability: true,
      encoding: true,
      listStyle: true,
      includeMetadata: true,
      knowledgeDepth: true,
      dataGranularity: true,
      mathematicalDetail: true,
      reasoningDepth: true,
    } as VisibleComponents,
  },
  chat: {
    label: 'Conversational AI',
    desc: 'Persona, tone, and psychological context',
    config: {
      ...PROFILE_ALL_FALSE,
      temperature: true,
      maxTokens: true,
      targetAudience: true,
      tone: true,
      customInstructions: true,
      status: true,
      experience: true,
      empathyLevel: true,
      emotionalIntensity: true,
      language: true,
      culturalContext: true,
      offTheRecord: true,
      socialDetail: true,
      psychologicalDetail: true,
      conversationalStyle: true, // Assuming this maps to writingStyle/tone if needed, but omitted as not in Power list
      writingStyle: true,
    } as VisibleComponents,
  },
  educator: {
    label: 'Educator / Tutor',
    desc: 'Clear explanations, audience adaptation, and learning',
    config: {
      ...PROFILE_ALL_FALSE,
      temperature: true,
      maxTokens: true,
      targetAudience: true,
      tone: true,
      customInstructions: true,
      language: true,
      knowledgeDepth: true,
      abstractionLevel: true,
      metaphorUsage: true,
      empathyLevel: true,
      experientialLearning: true,
      reasoningDepth: true,
      culturalContext: true,
      sentenceStructure: true,
      theoreticalUnderstanding: true,
      exampleSpecificity: true,
    } as VisibleComponents,
  },
  business: {
    label: 'Business / Professional',
    desc: 'Formal tone, structure, and economic context',
    config: {
      ...PROFILE_ALL_FALSE,
      temperature: true,
      maxTokens: true,
      tone: true,
      format: true,
      responseLength: true,
      customInstructions: true,
      strictness: true,
      paragraphFlow: true,
      headingHierarchy: true,
      listStyle: true,
      minimalOutput: true,
      domainSpecificity: true,
      regulatoryCompliance: true,
      language: true,
      informationDensity: true,
      economicDetail: true,
      persuasionTechnique: true,
    } as VisibleComponents,
  },
  researcher: {
    label: 'Researcher',
    desc: 'Detailed analysis, citations, and historical context',
    config: {
      ...PROFILE_ALL_FALSE,
      temperature: true,
      maxTokens: true,
      format: true,
      customInstructions: true,
      informationDensity: true,
      criticalThinking: true,
      reasoningDepth: true,
      knowledgeBreadth: true,
      knowledgeDepth: true,
      strictness: true,
      headingHierarchy: true,
      includeMetadata: true,
      language: true,
      synthesisCapability: true,
      theoreticalUnderstanding: true,
      domainExpertise: true,
      historicalDepth: true,
      evaluationCapability: true,
      argumentationStyle: true,
    } as VisibleComponents,
  },
  generalPurpose: {
    label: 'General Purpose',
    desc: 'Balanced settings for everyday tasks',
    config: {
      ...PROFILE_ALL_FALSE,
      temperature: true,
      maxTokens: true,
      targetAudience: true,
      tone: true,
      responseLength: true,
      customInstructions: true,
      format: true,
      language: true,
    } as VisibleComponents,
  },
  quickStart: {
    label: 'Quick Start',
    desc: 'Minimal setup with just basic controls',
    config: {
      ...PROFILE_ALL_FALSE,
      temperature: true,
      maxTokens: true,
      responseLength: true,
      customInstructions: true,
      language: true,
    } as VisibleComponents,
  },
  power: {
    label: 'Power User',
    desc: 'Access to all available controls',
    config: {
      ...PROFILE_ALL_FALSE,
      enhancementType: true,
      customInstructions: true,
      temperature: true,
      maxTokens: true,
      topP: true,
      topK: true,
      stopSequences: true,
      frequencyPenalty: true,
      presencePenalty: true,
      format: true,
      responseLength: true,
      language: true,
      encoding: true,
      strictness: true,
      minimalOutput: true,
      includeMetadata: true,
      cognitiveLoad: true,
      informationDensity: true,
      abstractionLevel: true,
      metaphorUsage: true,
      sentenceStructure: true,
      paragraphFlow: true,
      listStyle: true,
      headingHierarchy: true,
      tone: true,
      emotionalIntensity: true,
      persuasionTechnique: true,
      empathyLevel: true,
      targetAudience: true,
      culturalContext: true,
      domainSpecificity: true,
      technicalJargonLevel: true,
      regulatoryCompliance: true,
      knowledgeDepth: true,
      knowledgeBreadth: true,
      reasoningDepth: true,
      thinkingPattern: true,
      problemSolvingApproach: true,
      systemsThinking: true,
      criticalThinking: true,
      crossDomainTransfer: true,
      lateralThinking: true,
      experience: true,
      experienceLevel: true,
      timeHorizon: true,
      domainExpertise: true,
      skills: true,
      skillProficiency: true,
      expertiseFocus: true,
      domainSpecialization: true,
      learningCurve: true,
      retentionRate: true,
      acquisitionSpeed: true,
      patternRecognitionSensitivity: true,
      contextSensitivity: true,
      adaptability: true,
      ambiguityTolerance: true,
      creativeThinking: true,
      analyticalThinking: true,
      experientialLearning: true,
      theoreticalUnderstanding: true,
      practicalApplication: true,
      synthesisCapability: true,
      evaluationCapability: true,
      status: true,
      offTheRecord: true,
      biologicalDetail: true,
      chemicalDetail: true,
      mathematicalDetail: true,
      physicsDetail: true,
      artisticDetail: true,
      philosophicalDetail: true,
      historicalDepth: true,
      psychologicalDetail: true,
      socialDetail: true,
      narrativePerspective: true,
      economicDetail: true,
      technologicalDetail: true,
      dataGranularity: true,
      technicalDepth: true,
      environmentalDetail: true,
      geographicScope: true,
      detailLevel: true,
      exampleSpecificity: true,
      temporalScope: true,
      visualComplexity: true,
      argumentationStyle: true,
      writingStyle: true,
    } as VisibleComponents,
  },
};
// Assuming icons are imported from 'lucide-react'
// import {
//   Sliders, Cpu, Layout, PenTool, Globe, User, Brain,
//   Layers, FlaskConical, Scroll, Briefcase, Server
// } from 'lucide-react';

export const COMPONENT_CATEGORIES: Record<string, { label: string; icon: any }> = {
  // --- Core Configuration ---
  core: {label: 'Core Settings', icon: Sliders},
  model: {label: 'Model Parameters', icon: Cpu},
  format: {label: 'Structure & Format', icon: Layout},
  voice: {label: 'Voice & Tone', icon: PenTool},
  context: {label: 'Audience & Context', icon: Globe},
  persona: {label: 'Persona & Expertise', icon: User},
  cognition: {label: 'Thinking & Logic', icon: Brain},

  // --- Specialized Domains (Refactored from 'details') ---
  granularity: {label: 'Resolution & Depth', icon: Layers},
  sciences: {label: 'STEM & Sciences', icon: FlaskConical},
  humanities: {label: 'Humanities & Arts', icon: Scroll},
  business: {label: 'Business & Strategy', icon: Briefcase},
  technology: {label: 'Technology & Systems', icon: Server},
};

export const CATEGORIZED_COMPONENTS: Record<string, string[]> = {
  // --- Core ---
  core: [
    'customInstructions',
    'enhancementType',
    'enhancementParameters',
    'offTheRecord',
  ],

  model: [
    'temperature',
    'maxTokens',
    'topP',
    'topK',
    'stopSequences',
    'frequencyPenalty',
    'presencePenalty',
    'status',
  ],

  format: [
    'encoding',
    'format',
    'includeMetadata',
    'headingHierarchy',
    'listStyle',
    'minimalOutput',
    'responseLength',
    'strictness',
  ],

  voice: [
    'argumentationStyle',
    'emotionalIntensity',
    'empathyLevel',
    'metaphorUsage',
    'paragraphFlow',
    'persuasionTechnique',
    'sentenceStructure',
    'tone',
    'writingStyle',
  ],

  context: [
    'culturalContext',
    'domainSpecificity',
    'knowledgeBreadth',
    'knowledgeDepth',
    'language',
    'narrativePerspective',
    'regulatoryCompliance',
    'targetAudience',
    'technicalDepth',
    'technicalJargonLevel',
  ],

  persona: [
    'domainExpertise',
    'domainSpecialization',
    'experience',
    'experienceLevel',
    'experientialLearning',
    'expertiseFocus',
    'practicalApplication',
    'skills',
    'skillProficiency',
    'theoreticalUnderstanding',
    'timeHorizon',
  ],

  cognition: [
    'acquisitionSpeed',
    'adaptability',
    'ambiguityTolerance',
    'analyticalThinking',
    'contextSensitivity',
    'creativeThinking',
    'criticalThinking',
    'crossDomainTransfer',
    'evaluationCapability',
    'lateralThinking',
    'learningCurve',
    'patternRecognitionSensitivity',
    'problemSolvingApproach',
    'reasoningDepth',
    'retentionRate',
    'synthesisCapability',
    'systemsThinking',
    'thinkingPattern',
  ],

  // --- Specialized Domains ---

  granularity: [
    'abstractionLevel',
    'cognitiveLoad',
    'dataGranularity',
    'detailLevel',
    'exampleSpecificity',
    'informationDensity',
  ],

  sciences: [
    'biologicalDetail',
    'chemicalDetail',
    'mathematicalDetail',
    'physicsDetail',
  ],

  humanities: [
    'artisticDetail',
    'historicalDepth',
    'philosophicalDetail',
    'psychologicalDetail',
    'socialDetail',
  ],

  business: [
    'economicDetail',
    'environmentalDetail',
    'geographicScope',
    'temporalScope',
  ],

  technology: [
    'technologicalDetail',
    'visualComplexity',
  ],
};
