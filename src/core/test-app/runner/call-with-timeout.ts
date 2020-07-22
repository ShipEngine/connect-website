export default async function callWithTimeout(func: any, timeout: number) {
  const timer = setTimeout(() => new Error("test timeout"), timeout);

  try {
    func();
  } catch (error) {
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
