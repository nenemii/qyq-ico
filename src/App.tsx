import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Typography, theme } from 'antd';
import HomeHeader from './Home/Header/HomeHeader';
import BackgroundParticles from './components/BackgroundParticles'
import ProfileContent from './Home/content/Content';

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

const studyTitles: Record<StudyKey, string> = {
  html: 'HTML 基础入门',
  css: 'CSS 布局与样式',
  javascript: 'JavaScript 核心语法',
  react: 'React 组件化思维',
};

const App: React.FC = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const [activePage, setActivePage] = useState<PageKey>('home');
  const [activeStudyKey, setActiveStudyKey] = useState<StudyKey>('html');



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
      <Sider style={{ background: 'transparent' }} width={200}>
        <Menu
          mode="inline"
          selectedKeys={[activeStudyKey]}
          style={{ height: '100%', borderRight: 0, background: 'transparent' }}
          items={studySidebarItems}
          onClick={(info) => setActiveStudyKey(info.key as StudyKey)}
        />
      </Sider>
      <Content style={{ padding: '0 24px', minHeight: 360, background: 'transparent' }}>
        <Title level={2}>{studyTitles[activeStudyKey]}</Title>
        <Paragraph type="secondary">2026-03-06 · 学习笔记</Paragraph>
        <Paragraph>
          这里以博客文章的形式展示学习内容。可以按章节拆分小标题，配合代码块、图片等，逐步完善。
        </Paragraph>
        <Paragraph>
          现在只是搭好整体架构：左侧是知识点目录（HTML / CSS / JavaScript / React），右侧是对应的正文区域。
        </Paragraph>
      </Content>
    </Layout>
  );

  const renderContent = () => {
    if (activePage === 'home') return renderHome();
    if (activePage === 'diary') return renderDiary();
    return renderStudy();
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
      <BackgroundParticles />
      <Header style={{ display: 'flex', alignItems: 'center', background: 'transparent' }}>
        <div style={{ color: '#fff', fontWeight: 600, marginRight: 32 }}>My</div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activePage]}
          items={topNavItems}
          style={{ flex: 1, minWidth: 0, background: 'transparent' }}
          onClick={(info) => setActivePage(info.key as PageKey)}
        />
      </Header>
      <div style={{ background: 'transparent' }}>
        <Breadcrumb  />
        {renderContent()}
      </div>
      <Footer style={{ textAlign: 'center', color: '#fff', background: 'transparent' }}>
        个人博客 ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default App;