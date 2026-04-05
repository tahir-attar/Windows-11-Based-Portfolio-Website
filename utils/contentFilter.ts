const BLOCKED_WORDS = [
  'fuck', 'shit', 'ass', 'bitch', 'cunt', 'bastard', 'dick', 'cock',
  'pussy', 'whore', 'slut', 'nigger', 'nigga', 'faggot', 'retard',
  'rape', 'kill', 'murder', 'suicide', 'porn', 'sex', 'nude', 'naked',
  'damn', 'crap', 'piss', 'twat', 'wank', 'motherfucker', 'asshole',
  'bollocks', 'bugger', 'tosser', 'prick',
];

const PATTERN_SOURCE = BLOCKED_WORDS.map((w) => `\\b${w}\\b`).join('|');

export function containsExplicitContent(text: string): boolean {
  return new RegExp(PATTERN_SOURCE, 'i').test(text);
}

export function sanitizeText(text: string): string {
  return text.replace(new RegExp(PATTERN_SOURCE, 'gi'), (match) => '*'.repeat(match.length));
}
