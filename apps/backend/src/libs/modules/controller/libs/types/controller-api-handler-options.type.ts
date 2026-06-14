type ControllerAPIHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions
> = {
  body: T['body'];
  headers: T['headers'];
  params: T['params'];
  query: T['query'];
  user?: T['user'];
};

type DefaultApiHandlerOptions = {
  body?: unknown;
  headers?: unknown;
  params?: unknown;
  query?: unknown;
  user?: unknown;
};

export { type ControllerAPIHandlerOptions };
