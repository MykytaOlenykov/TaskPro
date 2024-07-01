import React, { Component } from "react";

interface IProps {
  fallback: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
}

interface IState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<IProps, IState> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // logs
  }

  render() {
    const { fallback, children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return fallback;
    }

    return <>{children}</>;
  }
}
