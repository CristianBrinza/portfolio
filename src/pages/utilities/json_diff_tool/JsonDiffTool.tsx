import { useState } from 'react';
import Title from '../../../components/Text/Title/Title.tsx';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import Page from '../../../components/Page.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import { Trans } from 'react-i18next';
import './JsonDiffTool.css';
import Icon from '../../../components/Icon.tsx';
import Button from '../../../components/Button.tsx';
import {
  diff,
  Diff,
  DiffEdit,
  DiffNew,
  DiffDeleted,
  DiffArray,
} from 'deep-diff';

export default function JsonDiffTool() {
  const [jsonInput1, setJsonInput1] = useState<string>('');
  const [jsonInput2, setJsonInput2] = useState<string>('');
  const [diffs, setDiffs] = useState<Diff<any>[] | null>(null);
  const [fileName1, setFileName1] = useState<string>('');
  const [fileName2, setFileName2] = useState<string>('');

  const handleJsonChange = (input1: string, input2: string) => {
    setJsonInput1(input1);
    setJsonInput2(input2);
    try {
      const jsonObj1 = JSON.parse(input1);
      const jsonObj2 = JSON.parse(input2);
      const differences = diff(jsonObj1, jsonObj2) || [];
      setDiffs(differences);
    } catch (err) {
      setDiffs(null);
    }
  };

  const handleFileUpload1 = (event: any) => {
    const file = event.target.files[0];
    setFileName1(file ? file.name : '');
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const text = e.target.result;
      handleJsonChange(text, jsonInput2);
    };
    reader.readAsText(file);
  };

  const handleFileUpload2 = (event: any) => {
    const file = event.target.files[0];
    setFileName2(file ? file.name : '');
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const text = e.target.result;
      handleJsonChange(jsonInput1, text);
    };
    reader.readAsText(file);
  };

  const handleCopy = () => {
    if (diffs) {
      const diffText = JSON.stringify(diffs, null, 2);
      navigator.clipboard.writeText(diffText);
    }
  };

  const handleDownload = () => {
    if (diffs) {
      const diffText = JSON.stringify(diffs, null, 2);
      const blob = new Blob([diffText], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'json_diff_result.json';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const renderDiffs = () => {
    if (!diffs || diffs.length === 0) {
      return <div className="no-diff-found">No differences found</div>;
    }

    return diffs.map((diff, index) => {
      const { kind, path } = diff;
      const formattedPath = path ? path.join('.') : '';

      let content;
      if (kind === 'E') {
        const { lhs, rhs } = diff as DiffEdit<any>;
        content = (
          <div key={index}>
            <strong>Edited:</strong> {formattedPath} <br />
            <span className="lhs highlight-left">
              Original: {JSON.stringify(lhs)}
            </span>
            <br />
            <span className="rhs highlight-right">
              Modified: {JSON.stringify(rhs)}
            </span>
          </div>
        );
      } else if (kind === 'N') {
        const { rhs } = diff as DiffNew<any>;
        content = (
          <div key={index}>
            <strong>Added:</strong> {formattedPath} <br />
            <span className="rhs highlight-right">
              New Value: {JSON.stringify(rhs)}
            </span>
          </div>
        );
      } else if (kind === 'D') {
        const { lhs } = diff as DiffDeleted<any>;
        content = (
          <div key={index}>
            <strong>Deleted:</strong> {formattedPath} <br />
            <span className="lhs highlight-left">
              Deleted Value: {JSON.stringify(lhs)}
            </span>
          </div>
        );
      } else if (kind === 'A') {
        const { item } = diff as DiffArray<any>;
        content = (
          <div key={index}>
            <strong>Array Changed:</strong> {formattedPath} <br />
            <span className="lhs highlight-left">
              Array Item: {JSON.stringify(item)}
            </span>
          </div>
        );
      } else {
        content = <div key={index}>Unknown change at {formattedPath}</div>;
      }
      return (
        <div className="diff-item" key={index}>
          {content}
        </div>
      );
    });
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', url: '/' },
          {
            label: <Trans>navigation.utilities_page</Trans>,
            url: '/utilities',
          },
          { label: 'JSON Diff Tool' },
        ]}
      />

      <Page gap="20px">
        <Title>JSON Diff Tool</Title>

        <div className="json_diff_container">
          <div className="json_diff_controls">
            <div id="file_input_label_block_1">
              <label
                className="file_input_label"
                htmlFor="json_diff_file_input_1"
              >
                Choose File 1
              </label>
              <input
                type="file"
                accept=".json"
                id="json_diff_file_input_1"
                className="json_diff_file_input"
                onChange={handleFileUpload1}
              />
              <span className="file_input_text">
                {fileName1 || 'No file chosen'}
              </span>
            </div>
            <div id="file_input_label_block_2">
              <label
                className="file_input_label"
                htmlFor="json_diff_file_input_2"
              >
                Choose File 2
              </label>
              <input
                type="file"
                accept=".json"
                id="json_diff_file_input_2"
                className="json_diff_file_input"
                onChange={handleFileUpload2}
              />
              <span className="file_input_text">
                {fileName2 || 'No file chosen'}
              </span>
            </div>
          </div>

          <div className="json_diff_textareas">
            <textarea
              value={jsonInput1}
              onChange={e => handleJsonChange(e.target.value, jsonInput2)}
              placeholder="Paste JSON 1 here or upload a file"
              className="json_diff_textarea"
            />
            <textarea
              value={jsonInput2}
              onChange={e => handleJsonChange(jsonInput1, e.target.value)}
              placeholder="Paste JSON 2 here or upload a file"
              className="json_diff_textarea"
            />
          </div>

          {diffs !== null && (
            <div className="json_diff_result">
              <h3>Differences:</h3>
              <div>{renderDiffs()}</div>
            </div>
          )}
        </div>

        <div className="json_diff_actions">
          <Button
            color="var(--theme_primary_color_white)"
            bgcolor="var(--theme_primary_color_black)"
            border="var(--theme_primary_color_black)"
            onClick={handleCopy}
            disabled={!diffs}
          >
            <Icon type="copy" />
            Copy
          </Button>
          <Button
            color="var(--theme_primary_color_white)"
            bgcolor="var(--theme_primary_color_black)"
            border="var(--theme_primary_color_black)"
            onClick={handleDownload}
            disabled={!diffs}
          >
            Download
          </Button>
        </div>
      </Page>
      <Footer />
    </>
  );
}
