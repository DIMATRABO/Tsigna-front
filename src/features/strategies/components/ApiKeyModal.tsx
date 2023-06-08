import { TextInput, CopyButton, ActionIcon, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

type Props = {
  webhookUrl: string;
  webhookKey: string;
};

const ApiKeyModal = ({ webhookUrl, webhookKey }: Props) => {
  console.log("webhookurl", webhookUrl);
  console.log("key", webhookKey);
  return (
    <>
      <TextInput
        label="webhook url"
        value={webhookUrl}
        rightSection={
          <CopyButton value={webhookUrl} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                  {copied ? (
                    <IconCheck size="1rem" />
                  ) : (
                    <IconCopy size="1rem" />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        }
      />
      <TextInput
        label="Key"
        value={webhookKey}
        rightSection={
          <CopyButton value={webhookKey} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                  {copied ? (
                    <IconCheck size="1rem" />
                  ) : (
                    <IconCopy size="1rem" />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        }
      />
    </>
  );
};

export default ApiKeyModal;
