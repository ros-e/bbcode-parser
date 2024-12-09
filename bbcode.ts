export const rules: [RegExp, string][] = [
  [/\[b\]([^\[]+)\[\/b\]/g, "<b>$1</b>"],
  [/\[i\]([^\[]+)\[\/i\]/g, "<i>$1</i>"],
];
