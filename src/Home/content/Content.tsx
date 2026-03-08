import React from "react";
import styles from "./Content.module.css";

import reactIcon from "../../assets/icons/React.svg";
import nodejsIcon from "../../assets/icons/NodeJS.svg";
import tsIcon from "../../assets/icons/TS.svg";
import pythonIcon from "../../assets/icons/Python.svg";
import javaIcon from "../../assets/icons/Java.svg";
import viteIcon from "../../assets/icons/Vite.svg";
import mysqlIcon from "../../assets/icons/MySQL.svg";
import langchainIcon from "../../assets/icons/LangChain.svg";
import ragIcon from "../../assets/icons/RAG.svg";

import { useNavigate } from "react-router-dom";

const ProfileContent: React.FC = () => {

  const navigate = useNavigate();

  const techIcons = [
    { name: 'React', icon: reactIcon },
    { name: 'NodeJS', icon: nodejsIcon },
    { name: 'TS', icon: tsIcon },
    { name: 'Python', icon: pythonIcon },
    { name: 'Java', icon: javaIcon },
    { name: 'Vite', icon: viteIcon },
    { name: 'MySQL', icon: mysqlIcon },
    { name: 'LangChain', icon: langchainIcon },
    { name: 'RAG', icon: ragIcon },
  ];

  const ingredients = [
    '金铲铲','健身','coding'
  ];
  
  const navigation = [
    {key:'study',value:'学习资料'},
    {key:'diary',value:'日记'}
  ]
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>技术栈</h2>
        <div className={styles.iconGroup}>
          {techIcons.map((tech) => (
            <div key={tech.name} className={styles.iconWrap}>
              <img src={tech.icon} alt={tech.name} className={styles.techIcon} />
              <span className={styles.iconLabel}>{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>何意味</h2>
        <div className={styles.tagGroup}>
          {ingredients.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>看导航</h2>
          <div className={styles.navGroup}>
          {navigation.map((nav) => (
            <span key={nav.key} className={styles.nav} onClick={()=>{navigate(`/${nav.key}`)}}>
              {nav.value}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfileContent;