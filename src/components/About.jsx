import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../hoc';
import style from './styles/about.module.css';
import { textVariant, fadeIn } from '../utils/motion';

const About = () => (
  <>
    <motion.h1 variants={textVariant()} className={style.title}>
      About Me
    </motion.h1>
    <div className={style.para}>
      <motion.p variants={fadeIn('', '', 0.5, 1)} className={style.text}>
        Hey there! I&apos;m
        {' '}
          Kaen (Braze),
        {' '}
        passionate about building web applications, mobile apps, SaaS products, developer tools, and AI-powered solutions. I love turning ideas into real products and collaborating with ambitious people who enjoy creating things that make a difference.
      </motion.p>
      <motion.p variants={fadeIn('', '', 1, 1)} className={style.text}>
        My journey into software development has been driven by curiosity, independence, and a desire to build. Starting as a freelancer, I taught myself how to develop software, worked with clients from around the world, and learned how to take products from concept to launch. Along the way, I discovered that great software is about more than code it's about solving real problems, understanding users, and continuously improving through feedback and iteration.
      </motion.p>
      <motion.p variants={fadeIn('', '', 1.25, 1)} className={style.text}>
        Ready to bring your project to life? Reach out I&apos;m excited to collaborate!
      </motion.p>
    </div>
  </>
);

export default SectionWrapper(About, 'about', '');
