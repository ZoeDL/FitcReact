import React from 'react';
import PDF from 'react-pdf-js';
import config from '../../constants/Config';
import { NavBar, Icon, Button } from 'antd-mobile';
import styles from './page.less';
import router from 'umi/router';

class PDFPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    router.goBack();
  }

  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }

  onPageComplete = (page) => {
    this.setState({ page });
  }

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }

  renderPagination = (page, pages) => {
    let previousButton = <Button inline size="small" onClick={this.handlePrevious}> <Icon type="left" /> </Button>;
    if (page === 1) {
      previousButton = <Button inline size="small" disabled> <Icon type="left" /> </Button>;
    }
    let nextButton = <Button inline size="small" onClick={this.handleNext}> <Icon type="right" /> </Button>;
    if (page === pages) {
      nextButton = <Button inline size="small" disabled> <Icon type="right" /> </Button>;
    }
    return (
        <div className={styles.pager}>
          {previousButton}
          <span>{page}/{pages}</span>
          {nextButton}
        </div>
      
    );
  }

  render() {
    const url = this.props.location.query.url;
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <div className="page-container">
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={this.goBack}
        >PDF预览</NavBar>
        <PDF
          file={`${config.webUrl}/Upload/${url}`}
          onDocumentComplete={this.onDocumentComplete}
          onPageComplete={this.onPageComplete}
          page={this.state.page}
          fillWidth
          fillHeight
        />
        {pagination}
      </div>
    )
  }
}

export default PDFPage;