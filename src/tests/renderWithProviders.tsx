import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity
    }
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: process.env.NODE_ENV === "test" ? () => {} : console.error
  }
});

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

export * from "@testing-library/react";

export const renderWithProviders = (ui: ReactElement) =>
  render(ui, { wrapper: Wrapper });
