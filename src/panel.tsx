import * as Abstract from "abstract-sdk";
import * as React from "react";
import { useParameter, useStorybookState } from "@storybook/api";
import { styled } from "@storybook/theming";
import { PARAM_KEY } from "./constants";

const ABSTRACT_APP_URL =
  process.env.STORYBOOK_ABSTRACT_APP_URL || "https://app.abstract.com";

const Iframe = styled.iframe({
  // position: "absolute",
  // width: "96%",
  // height: "94%",
  // border: "0 none",
  // left: "50%",
  // top: "50%",
  // transform: "translate(-50%, -50%)"
  width: "100%",
  height: "100%",
  padding: "24px"
});

function parseShareURL(url: string): string | void {
  return url.split("share.goabstract.com/")[1];
}

export function inferShareId(
  shareDescriptor: Abstract.ShareDescriptor
): string {
  let shareId: string | void;

  if ("url" in shareDescriptor) {
    shareId = parseShareURL(shareDescriptor.url);
  } else if ("shareId" in shareDescriptor) {
    shareId = shareDescriptor.shareId;
  }

  if (!shareId) {
    throw new Error(
      `Could not infer share id from ShareDescriptor: "${JSON.stringify(
        shareDescriptor
      )}"`
    );
  }

  return shareId;
}

export function Panel() {
  const { storyId } = useStorybookState();
  const shareDescriptor = useParameter<Abstract.ShareDescriptor | void>(
    PARAM_KEY
  );

  return React.useMemo(() => {
    if (!shareDescriptor) return null;

    const embedUrl = `${ABSTRACT_APP_URL}/embed/${inferShareId(
      shareDescriptor
    )}?find={id}&chromeless`;

    return (
      <Iframe src={embedUrl.replace("{id}", encodeURIComponent(storyId))} />
    );
  }, [shareDescriptor, storyId]);
}
