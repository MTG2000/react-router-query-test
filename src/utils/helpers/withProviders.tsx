export function withProviders<T>(...providers: React.FC<any>[]) {
  return (WrappedComponent: React.ComponentType<T>) => (props: T) =>
    providers.reduceRight((acc, Provider) => {
      return <Provider>{acc}</Provider>;
    }, <WrappedComponent {...(props as any)} />);
}
