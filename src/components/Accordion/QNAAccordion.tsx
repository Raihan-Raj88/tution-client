import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
import { chevronDown, chevronUp } from "../../assets/svgs/localSVGs";
import Aos from "aos";

const QNAAccordion = () => {
  Aos.init();
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  return (
    <Accordion allowZeroExpanded>
      <AccordionItem
        data-aos="zoom-in"
        data-aos-duration="1000"
        onClick={toggleAccordion}
        className="bg-slate-950 mb-3 rounded-xl"
      >
        <AccordionItemHeading>
          <AccordionItemButton className="bg-slate-300 text-slate-900 text-xl rounded-xl py-4 px-5 flex justify-between items-center">
            <span> How do I post a tuition job?</span>
            <span>{isOpen ? chevronUp : chevronDown}</span>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <p>
            Create a student account, fill in the tuition details (subject,
            location, budget), and post it. Tutors will contact you via
            WhatsApp.
          </p>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem
        data-aos="zoom-in"
        data-aos-duration="1000"
        onClick={toggleAccordion}
        className="bg-slate-950 mb-3 rounded-xl"
      >
        <AccordionItemHeading>
          <AccordionItemButton className="bg-slate-300 text-slate-900 text-xl rounded-xl py-4 px-5 flex justify-between items-center">
            <span> How can I apply as a tutor?</span>
            <span>{isOpen ? chevronUp : chevronDown}</span>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <p>
            Sign up as a tutor, complete your profile with your qualifications
            and experience, and start browsing tuition posts to connect with
            students.
          </p>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem
        data-aos="zoom-in"
        data-aos-duration="1000"
        onClick={toggleAccordion}
        className="bg-slate-950 mb-3 rounded-xl"
      >
        <AccordionItemHeading>
          <AccordionItemButton className="bg-slate-300 text-slate-900 text-xl rounded-xl py-4 px-5 flex justify-between items-center">
            <span> Is Tuition Point free to use?</span>
            <span>{isOpen ? chevronUp : chevronDown}</span>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <p>
            Yes, posting tuition jobs and browsing tutors is completely free for
            students. Tutors can also create profiles and apply for jobs at no
            cost.
          </p>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem
        data-aos="zoom-in"
        data-aos-duration="1000"
        onClick={toggleAccordion}
        className="bg-slate-950 mb-3 rounded-xl"
      >
        <AccordionItemHeading>
          <AccordionItemButton className="bg-slate-300 text-slate-900 text-xl rounded-xl py-4 px-5 flex justify-between items-center">
            <span> How do I contact a tutor or student?</span>
            <span>{isOpen ? chevronUp : chevronDown}</span>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <p>
            Once you find a match, simply click the WhatsApp button on their
            profile or tuition post to start chatting directly.
          </p>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default QNAAccordion;
