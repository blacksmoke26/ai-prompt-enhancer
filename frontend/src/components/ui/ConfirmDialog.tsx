/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import * as React from 'react';
import {AlertDialog, Button, Flex} from '@radix-ui/themes';

/**
 * Props for the ConfirmDialog component, defining customizable elements and text.
 * @example
 * <ConfirmDialog
 *   title="Are you sure?"
 *   description="This action cannot be undone."
 *   confirmCaption="Proceed"
 *   cancelCaption="Cancel"
 *   triggerElement={<button>Confirm Action</button>}
 * />
 */
export interface ConfirmDialogProps {
  /** Optional. The title of the confirmation dialog */
  title?: string;
  /** Optional. The descriptive text displayed in the dialog body */
  description?: string;
  /** Optional. The label for the cancel button. Defaults to "Cancel" */
  cancelCaption?: string;
  /** Optional. The label for the confirm button. Defaults to "Confirm" */
  confirmCaption?: string;
  /** Optional. The element that triggers the dialog. Should be a clickable React node (e.g., a button) */
  triggerElement?: React.ReactNode;

  /** Optional. The callback function to execute when the confirm button is clicked */
  onConfirmClick?(): void;

  /** Optional. The callback function to execute when the cancel button is clicked */
  onCancelClick?(): void;
}

/**
 * A confirmation dialog component that wraps the `AlertDialog` UI library component, allowing
 * users to confirm or cancel an action with customizable titles, descriptions, and buttons.
 * @example
 * <ConfirmDialog
 *   title="Are you sure?"
 *   description="This action cannot be undone."
 *   triggerElement={<Button>Confirm</Button>}
 *   cancelCaption="No, thanks"
 *   confirmCaption="Yes, proceed"
 * />
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        {props.triggerElement ?? <Button color="red">Confirm</Button>}
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{props?.title ?? 'Confirm'}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {props?.description ?? 'Are you sure?'}
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" onClick={() => props?.onCancelClick?.()}>
              {props?.cancelCaption ?? 'Cancel'}
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={() => props?.onConfirmClick?.()}>
              {props?.confirmCaption ?? 'Confirm'}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
