import { useState } from 'react';
import Title from '../../../components/Text/Title/Title.tsx';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import Page from '../../../components/Page.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import { Trans } from 'react-i18next';
import './JsonFormatter.css';
import Icon from '../../../components/Icon.tsx';
import Button from '../../../components/Button.tsx';

export default function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [formatStyle, setFormatStyle] = useState<string>('pretty');
  const [indentation, setIndentation] = useState<number>(2);
  const [, setCopied] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const handleJsonChange = (value: string) => {
    setJsonInput(value);
    try {
      const jsonObject = JSON.parse(value);
      setError(null);
      formatJson(jsonObject);
    } catch (err) {
      setError('Invalid JSON');
      setJsonOutput('');
    }
  };

  const formatJson = (jsonObject: any) => {
    let formattedJson;
    switch (formatStyle) {
      case 'pretty':
        formattedJson = JSON.stringify(jsonObject, null, indentation);
        break;
      case 'minified':
        formattedJson = JSON.stringify(jsonObject);
        break;
      case 'custom':
        formattedJson = JSON.stringify(jsonObject, null, indentation);
        break;
      default:
        formattedJson = JSON.stringify(jsonObject, null, indentation);
        break;
    }
    setJsonOutput(formattedJson);
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : ''); // Update file name display
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const text = e.target.result;
      handleJsonChange(text);
    };
    reader.readAsText(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatted.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetFields = () => {
    setJsonInput('');
    setJsonOutput('');
    setError(null);
    setCopied(false);
    setFileName('');
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
          { label: 'JSON Formatter' },
        ]}
      />

      <Page gap="20px">
        <Title>JSON Formatter</Title>

        <div className="formatter_container">
          <div className="formatter_controls">
            <Button
              color="var(--theme_primary_color_white)"
              bgcolor="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_black)"
              onClick={resetFields}
            >
              Reset
            </Button>
            <div id="file_input_label_block">
              <label
                className="file_input_label"
                htmlFor="formatter_file_input"
              >
                Choose File
              </label>
              <input
                type="file"
                accept=".json"
                id="formatter_file_input"
                className="formatter_file_input"
                onChange={handleFileUpload}
              />
              <span className="file_input_text">
                {fileName || 'No file chosen'}
              </span>
            </div>
            <select
              value={formatStyle}
              onChange={e => setFormatStyle(e.target.value)}
              className="formatter_select"
            >
              <option value="pretty">Pretty Print</option>
              <option value="minified">Minified</option>
              <option value="custom">Custom</option>
            </select>
            {formatStyle === 'custom' && (
              <input
                type="number"
                value={indentation}
                onChange={e => setIndentation(parseInt(e.target.value))}
                className="formatter_number_input"
                min="0"
                max="10"
                step="1"
                placeholder="Indentation"
              />
            )}
          </div>

          <textarea
            value={jsonInput}
            onChange={e => handleJsonChange(e.target.value)}
            placeholder="Paste JSON here or upload a file"
            className="formatter_textarea"
          />
          {error && <div className="error_message">{error}</div>}
          <textarea
            value={jsonOutput}
            readOnly
            placeholder="Formatted JSON output"
            className="formatter_output"
          />
        </div>

        <div className="formatter_actions">
          <Button
            color="var(--theme_primary_color_black)"
            border="var(--theme_primary_color_darkest_gray)"
            hover_bgcolor="var(--theme_primary_color_dark_gray)"
            onClick={handleCopy}
            disabled={!jsonOutput}
          >
            <Icon type="copy" />
            Copy
          </Button>
          <Button
            color="var(--theme_primary_color_white)"
            bgcolor="var(--theme_primary_color_black)"
            border="var(--theme_primary_color_black)"
            onClick={handleDownload}
            disabled={!jsonOutput}
          >
            Download
          </Button>
        </div>
      </Page>
      <Footer />
    </>
  );
}
