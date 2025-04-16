// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getIdNumber = (key: string, data: Record<string, any> | null) => {
  if (!data) return null;
  return `${key}${(data['id'] as number).toString().padStart(5, '0')}`;
}
