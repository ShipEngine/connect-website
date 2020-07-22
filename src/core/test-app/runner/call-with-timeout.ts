export default async function callWithTimeout(func: any, timeout: number) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("test timeout")), timeout);
    func()
      .then(
        (response: any) => resolve(response),
        (error: any) => reject(new Error(error)),
      )
      .finally(() => clearTimeout(timer));
  });
}
