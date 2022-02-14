import React, { useEffect } from "react";
import PageLayout, { PageLayoutProps } from "../page/page-layout";
import { RedocStandalone  } from "redoc";

export type ApiLayoutProps = PageLayoutProps & {
  OpenApiSpecification: any
}

/**
 * This is the layout for documentation pages, including all MDX files.
 * It's a three-column layout, with the navigation menu on the left, the main content in the middle,
 * and supplimental content (such as code samples) on the right.
 */
export default function ApiLayout(props: ApiLayoutProps) {
  const { OpenApiSpecification } = props;
  useEffect(() => {
    document.querySelector('body')?.classList.remove('connect');
  })
  return (
    <PageLayout {...props}>
      <RedocStandalone spec={ OpenApiSpecification } />
    </PageLayout>
  );
}
