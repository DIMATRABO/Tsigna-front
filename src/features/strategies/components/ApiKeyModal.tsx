import { TextInput, CopyButton, ActionIcon, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

type Props = {
  webhookUrl: string;
  key: string;
};

const ApiKeyModal = ({ webhookUrl, key }: Props) => {
  return (
    <>
      <TextInput
        placeholder="Webhook url"
        label="webhook url"
        defaultValue={webhookUrl}
        disabled
        rightSection={
          <CopyButton value="copied" timeout={2000}>
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
        placeholder="Key"
        label="Key"
        defaultValue={key}
        rightSection={
          <CopyButton value="copied" timeout={2000}>
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
