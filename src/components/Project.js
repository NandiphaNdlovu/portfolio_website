import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container, Row, Col } from "react-bootstrap"

import 'animate.css';

import linkIcon from '../assets/img/nav-icon2.svg'

function Project() {
    const [selectedId, setSelectedId] = useState(null);
    const items = [
        {
            id: 1,
            title: "EntropyWizard",
            description: `Introducing "EntropyWizard" – a C# application that measures information randomness in machines! Using statistical algorithms, it assesses data entropy, revealing its disorder level. The wizard's code incantations unveil patterns within chaos. Remember, even wizards can't control true randomness; they just understand its spellbinding dance.`,
            "link": `http://`,
            gitLink: `https://github.com/NandiphaNdlovu/MLG-Yeah`,

        },
        {
            id: 2,
            title: "TaskTrace",
            description: `Introducing "TaskTrace" – a HTML, CSS and JavaScript project that expertly manages issue lifecycles! This solution records assignments, tracks statuses, and monitors progress for project-related issues. Seamlessly organized, it's a virtual detective, ensuring every task follows a trail from inception to resolution. Let TaskTrace lead the way, transforming chaos into streamlined success.`,
            "link": "http://",
            gitLink: `https://github.com/NandiphaNdlovu/WPR281Project`
        },
        {
            id: 3,
            title: "SkillCanvas",
            description: `Presenting "SkillCanvas" – my personal portfolio crafted in HTML, CSS and JavaScrypt! This masterpiece showcases my profile picture, contact info, and skills like strokes of art. With pixel-perfect design`,
            "link": "https://nandiphandlovu.github.io/Profile_Card/",
            gitLink: `https://github.com/NandiphaNdlovu/Profile_Card`
        },
        {
            id: 4,
            title: "PaperlessCustodia",
            description: `Introducing "PaperlessCustodia" – a transformative web app powered by MongoDB! Say goodbye to manual filing woes. With a click, migrate customer records from paper chaos to digital order. Customizable fields, easy search, and secure storage – PaperlessCustodia digitizes and safeguards data, ensuring efficiency and peace of mind.`,
            "link": "http://",
            gitLink: `https://github.com/NandiphaNdlovu/Web_Filing_System`
        }
        ,
        {
            id: 5,
            title: "WeatherVue",
            description: `Presenting "WeatherVue" – a React-based web app harnessing weather APIs to paint meteorological magic! Enter a location, and watch as real-time weather details come alive on your screen. With intuitive design and accurate data, WeatherVue lets you peek into Mother Nature's mood with just a search.`,
            "link": "http://",
            gitLink: `https://github.com/NandiphaNdlovu/Weather_Web-based_App`
        },
        {
            id: 6,
            title: "ImageFlow",
            description: `Presenting "ImageFlow" – a dynamic project driven by EJS, JavaScript, and batch files, enabling seamless image uploads to MongoDB through a web app! Simply select images from your device, and let ImageFlow's magic handle the rest. With the power of batch scripting, your files journey to MongoDB, creating an elegant fusion of technology and convenience.`,
            "link": "http://",
            gitLink: `https://github.com/NandiphaNdlovu/Image-Upload-CRUD`
        },
        {
            id: 7,
            title: "AnimalInsight",
            description: `Introducing "AnimalInsight" – a Python-powered Jupyter Notebook project utilizing PyTorch's prowess to train a CNN-based machine learning algorithm. By analyzing image dimensions and color channels, AnimalInsight identifies animals from uploaded files. With data-driven magic, it deciphers the visual cues, learning to differentiate species. Witness the future of fauna recognition through technology!`,
            "link": "http://",
            gitLink: `https://github.com/NandiphaNdlovu/MLG382_Project`
        },
        // ...more items
    ]; // Define your items array here

    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = 'auto'; // Enable scrolling
        }

        return () => {
            document.body.style.overflow = 'auto'; // Make sure to re-enable scrolling when the component unmounts
        };
    }, [selectedId]);

    return (
        <Container>
            <div className='project'>
                <AnimatePresence className='this'>
                    {selectedId && (
                        <>
                            <div className="overlay" />

                            <motion.div layout layoutId={selectedId} className="selected-details">
                                {items.map(item => {
                                    if (item.id === selectedId) {
                                        return (
                                            <div key={item.id}>
                                                <motion.button onClick={() => setSelectedId(null)} className='top-close'>X</motion.button>
                                                <motion.h2 layout >{item.title}</motion.h2>
                                                <motion.p>{item.description}</motion.p>
                                                <span>
                                                    <a href={item.link}>Visit</a>
                                                    <a href={item.gitLink}><img src={linkIcon} alt="" /></a>
                                                </span>

                                                <motion.button onClick={() => setSelectedId(null)}>Close</motion.button>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
                <div className='project-items'>
                    {items.map(item => (
                        <motion.div
                            key={item.id}
                            layoutId={item.id}
                            onClick={() => setSelectedId(prevSelectedId => (prevSelectedId === item.id ? null : item.id))}
                            style={{
                                cursor: 'pointer',
                            }}
                        >
                            <ul className='flex flex-row gap-4'>
                                <li>
                                    <motion.h2 layout>{item.title}</motion.h2>
                                </li>
                            </ul>

                        </motion.div>

                    ))}

                </div>
            </div>
        </Container>
    );
}
export default Project;

