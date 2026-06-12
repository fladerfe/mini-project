type ControllerAPIHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions
> = {
  body: T['body'];
  headers: T['headers'];
  params: T['params'];
  query: T['query'];
};

type DefaultApiHandlerOptions = {
  body?: unknown;
  headers?: unknown;
  params?: unknown;
  query?: unknown;
};

export { type ControllerAPIHandlerOptions };
