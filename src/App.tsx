import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Typography, theme } from 'antd';
import HomeHeader from './Home/Header/HomeHeader';
import BackgroundParticles from './components/BackgroundParticles'
import ProfileContent from './Home/content/Content';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import profile from './assets/profile.jpg'

import HtmlPost from './study/html/Html.mdx';
import CssPost from './study/css/Css.mdx';
import JavascriptPost from './study/javascript/Javascript.mdx';
import ReactPost from './study/react/React.mdx';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph } = Typography;

type PageKey = 'home' | 'study' | 'diary';
type StudyKey = 'html' | 'css' | 'javascript' | 'react';

const topNavItems: MenuProps['items'] = [
  { key: 'home', label: '首页' },
  { key: 'study', label: '学习资料' },
  { key: 'diary', label: '日记' },
];

const studySidebarItems: MenuProps['items'] = [
  { key: 'html', label: 'HTML' },
  { key: 'css', label: 'CSS' },
  { key: 'javascript', label: 'JavaScript' },
  { key: 'react', label: 'React' },
];



const studyComponents : Record<StudyKey,React.ReactNode> = {
  html: <HtmlPost />,
  css: <CssPost />,
  javascript: <JavascriptPost />,
  react: <ReactPost />
};


const App: React.FC = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuVisible,setIsMenuVisible] = useState(false);

  //const [activeStudyKey, setActiveStudyKey] = useState<StudyKey>('html');

  const getActivePage = (): PageKey => {
    if (location.pathname.startsWith('/study')) return 'study';
    if (location.pathname.startsWith('/diary')) return 'diary';
    return 'home';
  };
  
  const getActiveStudyPage = (): StudyKey => {
    // 根据 URL 路径来匹配侧边栏的选中状态
    if (location.pathname.includes('/html')) return 'html';
    if (location.pathname.includes('/css')) return 'css';
    if (location.pathname.includes('/javascript')) return 'javascript';
    if (location.pathname.includes('/react')) return 'react';
    return 'html'; // 默认高亮 html
  };


  const renderHome = () => (
    <Content
      style={{
        padding: '24px',
        // background: colorBgContainer
        borderRadius: borderRadiusLG,
        minHeight: 360,
      }}
    >
      <HomeHeader/>  
      <ProfileContent/>
    </Content>
  );

  const renderDiary = () => (
    <Content
      style={{
        padding: '24px',
        //background: colorBgContainer,
        borderRadius: borderRadiusLG,
        minHeight: 360,
      }}
    >
      <Title level={2}>日记</Title>
      <Paragraph>这里以后可以按时间线展示你的生活日常、随想等内容。</Paragraph>
    </Content>
  );

  const renderStudy = () => (
    <Layout
      style={{
        padding: '24px 0',
        background: 'transparent',
        borderRadius: borderRadiusLG,
      }}
    >
      <Sider style={{ background: 'transparent',overflow:'auto',position:'sticky',top:24,height: 'calc(100vh - 120px)' }} width={150} >
        <Menu
          mode="inline"
          selectedKeys={[getActiveStudyPage()]}
          style={{ height: '100%', borderRight: 0, background: 'transparent' ,color:'#fff'}}
          items={studySidebarItems}
          onClick={(info) => {navigate(`/study/${info.key}`)}}
        />
      </Sider>
      <Content style={{ padding: '0 24px', minHeight: 360, background: 'transparent' }}>
        
        <div className="markdown-body" style={{ background: 'transparent', color: '#fff' }}>
          {studyComponents[getActiveStudyPage()]}
        </div>
      </Content>
    </Layout>
  );

  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
      <BackgroundParticles />
      <Header style={{ display: 'flex', alignItems: 'center', background: 'transparent' }}>
        <div 
        style={{ color: '#fff', fontWeight: 600, marginRight: 32 }} 
        onClick={()=>{setIsMenuVisible(!isMenuVisible)}}
        >
          <img src={profile} alt="喵" style={{width:30,height:30,borderRadius:50,cursor:'pointer'}} />
        </div>
        {isMenuVisible && <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[getActivePage()]}
          items={topNavItems}
          style={{ flex: 1, minWidth: 0, background: 'transparent' }}
          onClick={(info) => {
            if (info.key === 'home') navigate('/');
            else navigate(`/${info.key}`);
          }}
        />}
        
      </Header>
      <div style={{ background: 'transparent' }}>
        <Breadcrumb  />
        <Routes>
          <Route path="/" element={renderHome()} />
          <Route path="/study/*" element={renderStudy()} />
          <Route path="/diary" element={renderDiary()} />
        </Routes>
      </div>
      <Footer style={{ textAlign: 'center', color: '#fff', background: 'transparent' }}>
        个人博客 ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default App;