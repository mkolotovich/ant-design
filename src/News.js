import './News.css';
import { Card, Typography, Button, Dropdown, Space } from 'antd';
import { EyeOutlined, LinkOutlined, GlobalOutlined, DownOutlined, InfoOutlined, BookOutlined, ManOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useRef, useEffect, useState, Fragment } from 'react';

const { Title, Text, Link } = Typography;

const News = ({props}) => {
  const date = new Date(props.DP);
  const monthes = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun'
  }
  const reach = props.REACH < 1000 ? props.REACH : `${Math.round(props.REACH / 1000)}K`;
  const formattedDate = `${date.getDate()} ${monthes[date.getMonth()]} ${date.getFullYear()}`;
  const allTraffic = props.TRAFFIC.reduce((acc, el) => acc + el.count, 0);
  const percentageTraffic = props.TRAFFIC.map(({value, count}) => { return {value, count: `${Math.round((count * 100) / allTraffic)}%`};});
  const divEl = useRef(null);
  useEffect(() => {
    const p = divEl.current.querySelectorAll("p");
    p.forEach(element => {
      if (element.textContent.includes('<kw>')) {
        let el = element.textContent.replace(/<kw>/g, '<span class="kw">')
        el = el.replace(/<\/kw>/g, '</span>')
        element.innerHTML = el;
      }
    });
  });
  const [visibleNews, setCount] = useState([props.HIGHLIGHTS[0]]);
  const maxKW = 10;
  const restKW = props.KW.length - maxKW;
  const [visibleKW, setKWCount] = useState(props.KW.slice(0, maxKW));
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
  ]
  return (
    <Card className="news-block">
      <div className="container">
        <div className="header">
          <div className="wrapper">
            <div className="date"><span className="white">{date.getDate()}</span> {monthes[date.getMonth()]} {date.getFullYear()}</div>
            <div className="reach"><span className="white">{reach}</span> Reach</div>
            <div className="traffic">Top Traffic: {percentageTraffic.map((el,i) => <Fragment key={i}> {el.value}<span className="white"> {el.count}</span></Fragment>)}</div>
          </div>
          <div className="actions">
            <Button type="primary" color="cyan" variant="solid" className="custom-btn" size="small">{props.SENT}</Button>
            <Button className="btn-reset border" size="small"><InfoOutlined  style={{ color: 'white', marginLeft: '-4px', marginRight: '-4px' }}/></Button>
            <Button className="btn-reset border p-10" size="small"></Button>
          </div>
        </div>
        <div className="content">
          <div className="title">{props.TI}</div>
          <div className="source">
            <GlobalOutlined /><a href="https://punto-informatico.it" target="_blank" rel="noopener noreferrer" className="link">{props.DOM}</a>
            <span className="mr-5">{props.CNTR}</span>
            <BookOutlined className="mr-5"/><span className="mr-5">{props.LANG}</span>
            <ManOutlined className="mr-5"/><span>{props.AU.join(', ')}</span>
          </div>
          <div className="description" ref={divEl}>
            {visibleNews.map((v, index) => 
              <p key={index}>{v}</p>
            )}
            <button className="show-more" onClick={() => setCount(props.HIGHLIGHTS)}>Show more <ArrowDownOutlined /></button>
          </div>
          <div className="keywords">
            {visibleKW.map((el, i) => <span key={i} className="ant-tag">{el.value} <span className="white">{el.count}</span></span>)}
            {props.KW.length > maxKW ? <button className="show-all btn-reset" onClick={() => setKWCount(props.KW)}>Show All +{restKW}</button> : ''}
          </div>
        </div>
        <div className="original-source">
          <Button type="link">Original Source</Button>
        </div>
        <div className="duplicates-section">
          <div className="d-flex j-content mb-10">
            <Text type="secondary" className="duplicates-count">Duplicates: <span className="white">192</span></Text>
            <Dropdown menu={{ items }}>
              <button className="b-0" onClick={(e) => e.preventDefault()}>
                <Space className="grey">
                  By Relevance
                  <DownOutlined />
                </Space>
              </button>
            </Dropdown>
          </div>
          <Card className="duplicate-card" size="small">
            <div className="d-flex">
              <Text className="duplicate-date">{formattedDate}</Text>
              <Text className="duplicate-reach white">{reach} Top Reach</Text>
              <div className="actions ml-auto">
                <Button className="btn-reset border" size="small"><InfoOutlined  style={{ color: 'white', marginLeft: '-4px', marginRight: '-4px' }}/></Button>
                <Button className="btn-reset border p-10" size="small"></Button>
              </div>
            </div>
            <Title level={5} className="title">{props.TI}</Title>
            <div className="news-meta">
              <GlobalOutlined /><Link href="#" className="mr-5 link">{props.DOM}</Link>
              <Text className="mr-5 grey">{props.CNTR}</Text>
              <ManOutlined className="mr-5"/><span className="grey">{props.AU.join(', ')}</span>
            </div>
          </Card>
        </div>
        <Dropdown menu={{ items }} className="btn">
          <button onClick={(e) => e.preventDefault()}>
            <Space>
              View Duplicates
              <DownOutlined />
            </Space>
          </button>
        </Dropdown>
      </div>
    </Card>
  );
}

export default News;