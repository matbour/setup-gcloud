import { getInput } from '@actions/core';

export function setInputs(inputs: Record<string, string>): typeof getInput {
  return (name) => {
    return inputs[name] ?? '';
  };
}
