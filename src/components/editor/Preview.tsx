import { Code } from "bright";
import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";

Code.theme = {
  light: "github-light",
  dark: "github-dark",
  lightSelector: "html.light",
};

const Preview = ({ formattedContent }: { formattedContent: string }) => {
  return (
    <section className="markdown prose grid break-words mt-4">
      <MDXRemote
        source={formattedContent as string}
        components={{
          pre: (props) => (
            <Code
              {...props}
              lineNumbers
              className="shadow-light-200 dark:shadow-dark-200"
            />
          ),
        }}
      />
    </section>
  );
};

export default Preview;
