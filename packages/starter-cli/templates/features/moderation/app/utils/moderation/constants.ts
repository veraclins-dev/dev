import { type ReportCategory } from '../db/enums';
import { type ThresholdConfig } from './types';

export const REPORT_THRESHOLDS: Record<ReportCategory, ThresholdConfig> = {
  under_18_content: {
    autoHideThreshold: 1,
    queueThreshold: 1,
  },
  harassment_or_bullying: {
    autoHideThreshold: 1,
    queueThreshold: 1,
  },
  suicide_self_harm: {
    autoHideThreshold: 1,
    queueThreshold: 1,
  },
  violent_or_disturbing: {
    autoHideThreshold: 1,
    queueThreshold: 1,
  },
  spam: {
    autoHideThreshold: 5,
    queueThreshold: 3,
    combinationMultiplier: 0.8,
  },
  misinformation: {
    autoHideThreshold: 3,
    queueThreshold: 2,
    combinationMultiplier: 0.85,
  },
  unwanted_content: {
    autoHideThreshold: 10,
    queueThreshold: 7,
    combinationMultiplier: 0.85,
  },
  illegal_content: {
    autoHideThreshold: 1,
    queueThreshold: 1,
  },
  impersonation_or_fake: {
    autoHideThreshold: 1,
    queueThreshold: 1,
  },
  spam_account: {
    autoHideThreshold: 5,
    queueThreshold: 3,
    combinationMultiplier: 0.8,
  },
};

export const VOTE_THRESHOLDS = {
  downvoteRatio: 0.6,
  absoluteDownVotes: 50,
  downvoteToUpvoteRatio: 2.0,
};

export const VIOLATION_POINTS = {
  p0_critical: 10,
  p1_severe: 5,
  p2_moderate: 3,
  p3_minor: 1,
};

export const VIOLATION_THRESHOLDS = {
  warning: 5,
  restriction: 15,
  suspension: 30,
  ban: 50,
};

export const VIOLATION_DECAY = {
  daysUntilDecay: 90,
  decayRate: 0.5,
};
