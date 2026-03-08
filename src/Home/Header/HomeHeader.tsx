import React from "react";
import profile from '../../assets/profile.jpg';
import style from './HomeHeader.module.css';

const tags = ['重庆大学', '前端', 'cat','泉阳泉','金铲铲之战'];

const HomeHeader: React.FC = () => {
  return (
    <div className={style.content}>
      <div className={style.avatarGlow}>
        <img className={style.profile} src={profile} alt="头像" />
      </div>
      <h2 className={style.name}>Hey,这里是泉阳泉</h2>
      <div className={style.tags}>
        {tags.map((t) => (
          <span key={t} className={style.tag}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HomeHeader;