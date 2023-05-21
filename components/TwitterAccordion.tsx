'use client';
import { Fragment, useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody, Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

export interface Props {
  id: number;
  tweetId: string;
}

export default function TwitterAccordion(props: Props) {
  // const [open, setOpen] = useState(1);
  // const handleOpen = (value: number) => {
  //   setOpen(open === value ? 0 : value);
  // };
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <Fragment>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody divider>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus ad reprehenderit omnis perspiciatis aut odit! Unde architecto perspiciatis, dolorum dolorem iure quia saepe autem
          accusamus eum praesentium magni corrupti explicabo!
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
  // <Fragment>
  //   <button
  //     onClick={() => handleOpen(props.id)}
  //     className=" inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
  //     type="button"
  //   >
  //     投稿を見る
  //   </button>
  //   <Dialog size="sm" active={open === props.id} toggler={() => handleOpen(props.id)}>
  //     <DialogHeader>Its a simple dialog.</DialogHeader>
  //     <DialogBody divider>
  //       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus ad reprehenderit omnis perspiciatis aut odit! Unde architecto perspiciatis, dolorum dolorem iure quia saepe autem
  //       accusamus eum praesentium magni corrupti explicabo!
  //     </DialogBody>
  //     <DialogFooter>
  //       <button onClick={() => handleOpen(0)} className="mr-1">
  //         <span>Cancel</span>
  //       </button>
  //       <button onClick={() => handleOpen(0)}>
  //         <span>Confirm</span>
  //       </button>
  //     </DialogFooter>
  //   </Dialog>
  // </Fragment>

  // );
}
