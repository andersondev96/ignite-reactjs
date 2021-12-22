// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (_, res) => {
  res.clearPreviewData();

  res.writeHead(307, { Location: '/' });
  res.end();
};
