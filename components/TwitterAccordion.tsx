'use client';
import { Fragment, useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody, Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

export interface Props {
  id: number;
  tweetId: string;
}

export default function TwitterAccordion(props: Props) {
  const [open, setOpen] = useState(1);
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <Fragment>
      <Button
        onClick={() => handleOpen(props.id)}
        variant="gradient"
        className=" inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
      >
        投稿を見る
      </Button>
      <Dialog open={open === props.id} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody divider className="text-base">
          test {props.tweetId}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => handleOpen(props.id)} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => handleOpen(props.id)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
