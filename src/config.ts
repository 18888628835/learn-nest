export default async () => {
  const dbPort = await Promise.resolve(5432);
  const dbHost = await Promise.resolve('localhost');
  return {
    db: {
      host: dbHost,
      port: dbPort,
    },
  };
};
