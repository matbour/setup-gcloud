export default function mapping<T extends string, K extends string>(
  map: Partial<Record<T, K>>,
  value: T,
  message = 'Unsupported value {value}',
): K {
  if (!(value in map)) {
    throw new Error(message.replace('{value}', value));
  }

  return map[value] as K;
}
