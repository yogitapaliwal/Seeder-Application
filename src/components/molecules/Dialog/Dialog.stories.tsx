import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Dialog from '@/components/molecules/Dialog/Dialog';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';

const meta: Meta<typeof Dialog> = {
  title: 'Molecules/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    children: {
      // ReactNode can't be meaningfully edited via the object control,
      // so it's disabled here and documented instead.
      control: false,
      description: 'Dialog body content.',
    },
    footer: {
      control: false,
      description: 'Action buttons rendered at the bottom of the dialog.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

const DialogWithTrigger = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  return (
    <>
      <Button variant="primary" size="large" onClick={() => setOpen(true)}>
        Create Cash Kick
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Name your cash kick"
        subTitle="Add a name to identify your cash kick"
        footer={
          <>
            <Button variant="tertiary" size="large" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="large"
              disabled={name.length < 3}
              onClick={() => setOpen(false)}
            >
              Create Cash Kick
            </Button>
          </>
        }
      >
        <Input
          label="Cash kick name"
          placeholder="Ex: marketing expenses"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Dialog>
    </>
  );
};

const UnderReviewDialogWithTrigger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" size="large" onClick={() => setOpen(true)}>
        Show Under-Review Dialog
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        disableClose
        title="Cash kick launched successfully!"
        subTitle="We are reviewing your cash kick"
        footer={
          <Button variant="primary" size="large" onClick={() => setOpen(false)}>
            View Cash Kicks
          </Button>
        }
      >
        This dialog can only be dismissed via its footer button — backdrop click and Escape are
        disabled via `disableClose`.
      </Dialog>
    </>
  );
};

export const Default: Story = {
  render: () => <DialogWithTrigger />,
};

export const DisableClose: Story = {
  render: () => <UnderReviewDialogWithTrigger />,
  parameters: {
    docs: {
      description: {
        story:
          'With `disableClose`, the close (X) button is hidden and backdrop-click/Escape no longer dismiss the dialog.',
      },
    },
  },
};
