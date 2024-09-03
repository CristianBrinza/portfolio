import { useState } from 'react';
import Title from '../../../components/Text/Title/Title.tsx';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import Page from '../../../components/Page.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import { Trans } from 'react-i18next';
import './WordCounter.css';
import Icon from '../../../components/Icon.tsx';
import Button from '../../../components/Button.tsx';

export default function WordCounter() {
  const [textInput, setTextInput] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [, setCopied] = useState(false);

  const handleTextChange = (value: string) => {
    setTextInput(value);
    setCopied(false);
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : ''); // Update file name display
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const text = e.target.result;
      handleTextChange(text);
    };
    reader.readAsText(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(textInput);
    setCopied(true);
  };

  const handleDownload = () => {
    const blob = new Blob([textInput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'word_counted.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetFields = () => {
    setTextInput('');
    setFileName('');
    setCopied(false);
  };

  const wordCount = textInput
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;
  const characterCount = textInput.length;

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', url: '/' },
          {
            label: <Trans>navigation.utilities_page</Trans>,
            url: '/utilities',
          },
          { label: 'Word Counter' },
        ]}
      />

      <Page gap="20px">
        <Title>Word Counter</Title>

        <div className="word_counter_container">
          <div className="word_counter_controls">
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
                htmlFor="word_counter_file_input"
              >
                Choose File
              </label>
              <input
                type="file"
                accept=".txt"
                id="word_counter_file_input"
                className="word_counter_file_input"
                onChange={handleFileUpload}
              />
              <span className="file_input_text">
                {fileName || 'No file chosen'}
              </span>
            </div>
          </div>

          <textarea
            value={textInput}
            onChange={e => handleTextChange(e.target.value)}
            placeholder="Paste text here or upload a file"
            className="word_counter_textarea"
          />

          <div className="word_counter_stats">
            <p>Words: {wordCount}</p>
            <p>Characters: {characterCount}</p>
          </div>
        </div>

        <div className="word_counter_actions">
          <Button
            color="var(--theme_primary_color_white)"
            bgcolor="var(--theme_primary_color_black)"
            border="var(--theme_primary_color_black)"
            onClick={handleCopy}
            disabled={!textInput}
          >
            <Icon type="copy" />
            Copy
          </Button>
          <Button
            color="var(--theme_primary_color_white)"
            bgcolor="var(--theme_primary_color_black)"
            border="var(--theme_primary_color_black)"
            onClick={handleDownload}
            disabled={!textInput}
          >
            Download
          </Button>
        </div>
      </Page>
      <Footer />
    </>
  );
}
