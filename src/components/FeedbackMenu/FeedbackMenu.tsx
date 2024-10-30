import React, { useState, useEffect } from "react";
import styles from "./FeedbackMenu.module.css";
import Popup from "../Popup/Popup.tsx";
import Parapraph from "../Text/Parapraph/Parapraph.tsx";
import Icon from "../Icon.tsx";
import Button from "../Button.tsx";
import Notification from "../Notification/Notification.tsx";

const FeedbackMenu: React.FC = () => {
    const [isFeedbackPopupVisible, setIsFeedbackPopupVisible] = useState(false);
    const [answers, setAnswers] = useState<{ [key: string]: number }>({
        design: 0,
        usability: 0,
        work: 0,
    });
    const [improvement, setImprovement] = useState<string>("");

    const [showNotification1, setShowNotification1] = useState(false); // For unanswered questions
    const [showNotification2, setShowNotification2] = useState(false); // For success notification
    const [showNotification3, setShowNotification3] = useState(false); // For error notification

    // Load stored answers from localStorage on mount
    useEffect(() => {
        const storedAnswers = localStorage.getItem("feedbackAnswers");
        if (storedAnswers) {
            setAnswers(JSON.parse(storedAnswers));
        }
    }, []);

    const choseStars = (question: string, rating: number) => {
        setAnswers((prev) => {
            const updatedAnswers = { ...prev, [question]: rating };
            localStorage.setItem("feedbackAnswers", JSON.stringify(updatedAnswers));
            return updatedAnswers;
        });
    };

    const toggleFeedbackPopup = () => {
        setIsFeedbackPopupVisible(!isFeedbackPopupVisible);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setImprovement(e.target.value);
    };

    const handleNotificationClick1 = () => {
        if (answers.design === 0 || answers.usability === 0 || answers.work === 0) {
            // Show notification if any question has not been answered
            setShowNotification1(true);
            setTimeout(() => {
                setShowNotification1(false);
            }, 5000);
            return;
        }

        handleSubmit();
    };

    const handleSubmit = async () => {
        try {
            const formData = new URLSearchParams();
            formData.append('entry.332711705', answers.design.toString()); // Design rating
            formData.append('entry.856004240', answers.usability.toString()); // Usability rating
            formData.append('entry.925523382', answers.work.toString()); // Likelihood to work together
            formData.append('entry.1262297536', improvement); // Improvement suggestions

            await fetch(import.meta.env.VITE_FEEDBACK_FORM, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData.toString(),
            });

            // Reset the state
            setAnswers({ design: 0, usability: 0, work: 0 });
            setImprovement("");
            setIsFeedbackPopupVisible(false); // Close the popup
            setShowNotification2(true); // Success notification
            setTimeout(() => {
                setShowNotification2(false);
            }, 5000);
        } catch (error) {
            setShowNotification3(true); // Error notification
            setTimeout(() => {
                setShowNotification3(false);
            }, 5000);
        }
    };

    return (
        <div className={styles.FeedbackMenu}>
            <svg
                onClick={toggleFeedbackPopup}
                className={styles.FeedbackMenu_side}
                width="25"
                height="89"
                viewBox="0 0 25 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-inside-1_4466_9047" fill="white">
                    <path d="M0 8C0 3.58172 3.58172 0 8 0H25V89H8C3.58172 89 0 85.4183 0 81V8Z" />
                </mask>
                <path d="M-1 8C-1 3.02944 3.02944 -1 8 -1H25V1H8C4.13401 1 1 4.13401 1 8H-1ZM25 90H8C3.02944 90 -1 85.9706 -1 81H1C1 84.866 4.13401 88 8 88H25V90ZM8 90C3.02944 90 -1 85.9706 -1 81V8C-1 3.02944 3.02944 -1 8 -1V1C4.13401 1 1 4.13401 1 8V81C1 84.866 4.13401 88 8 88V90ZM25 0V89V0Z" fill="#DADADA" mask="url(#path-1-inside-1_4466_9047)" />
                <path d="M19 75.56H8.504V69.512H9.624V74.232H13.176V70.232H14.296V74.232H19V75.56ZM19.192 64.8485C19.192 65.5418 19.032 66.1712 18.712 66.7365C18.3813 67.3018 17.912 67.7498 17.304 68.0805C16.696 68.4112 15.9707 68.5765 15.128 68.5765C14.2747 68.5765 13.544 68.4112 12.936 68.0805C12.328 67.7392 11.8587 67.3018 11.528 66.7685C11.1973 66.2352 11.032 65.6752 11.032 65.0885C11.032 64.0965 11.3627 63.3338 12.024 62.8005C12.6853 62.2565 13.5707 61.9845 14.68 61.9845C14.8187 61.9845 14.9573 61.9898 15.096 62.0005C15.224 62.0005 15.336 62.0112 15.432 62.0325L15.432 67.2805C16.2533 67.2272 16.9093 66.9712 17.4 66.5125C17.8907 66.0432 18.136 65.4352 18.136 64.6885C18.136 64.3152 18.0827 63.9738 17.976 63.6645C17.8587 63.3445 17.7093 63.0405 17.528 62.7525L18.392 62.2885C18.6053 62.6192 18.792 62.9978 18.952 63.4245C19.112 63.8405 19.192 64.3152 19.192 64.8485ZM14.488 67.2965V63.1365C13.6987 63.1365 13.1013 63.3072 12.696 63.6485C12.28 63.9792 12.072 64.4485 12.072 65.0565C12.072 65.6005 12.2853 66.0912 12.712 66.5285C13.128 66.9552 13.72 67.2112 14.488 67.2965ZM19.192 56.911C19.192 57.6043 19.032 58.2337 18.712 58.799C18.3813 59.3643 17.912 59.8123 17.304 60.143C16.696 60.4737 15.9707 60.639 15.128 60.639C14.2747 60.639 13.544 60.4737 12.936 60.143C12.328 59.8017 11.8587 59.3643 11.528 58.831C11.1973 58.2977 11.032 57.7377 11.032 57.151C11.032 56.159 11.3627 55.3963 12.024 54.863C12.6853 54.319 13.5707 54.047 14.68 54.047C14.8187 54.047 14.9573 54.0523 15.096 54.063C15.224 54.063 15.336 54.0737 15.432 54.095V59.343C16.2533 59.2897 16.9093 59.0337 17.4 58.575C17.8907 58.1057 18.136 57.4977 18.136 56.751C18.136 56.3777 18.0827 56.0363 17.976 55.727C17.8587 55.407 17.7093 55.103 17.528 54.815L18.392 54.351C18.6053 54.6817 18.792 55.0603 18.952 55.487C19.112 55.903 19.192 56.3777 19.192 56.911ZM14.488 59.359V55.199C13.6987 55.199 13.1013 55.3697 12.696 55.711C12.28 56.0417 12.072 56.511 12.072 57.119C12.072 57.663 12.2853 58.1537 12.712 58.591C13.128 59.0177 13.72 59.2737 14.488 59.359ZM19.192 49.4695C19.192 50.4402 18.84 51.2188 18.136 51.8055C17.4213 52.3922 16.4187 52.6855 15.128 52.6855C14.2853 52.6855 13.56 52.5308 12.952 52.2215C12.3333 51.9015 11.8587 51.4855 11.528 50.9735C11.1973 50.4508 11.032 49.8962 11.032 49.3095C11.032 48.8615 11.112 48.4722 11.272 48.1415C11.432 47.8108 11.6507 47.4748 11.928 47.1335L10.6 47.1975H7.608V45.8695H19V46.9575L18.088 47.0695V47.1175C18.3867 47.4162 18.648 47.7682 18.872 48.1735C19.0853 48.5788 19.192 49.0108 19.192 49.4695ZM18.088 49.1815C18.088 48.4988 17.7307 47.8375 17.016 47.1975H12.952C12.6533 47.5282 12.4453 47.8482 12.328 48.1575C12.2 48.4562 12.136 48.7655 12.136 49.0855C12.136 49.5015 12.264 49.8802 12.52 50.2215C12.7653 50.5522 13.112 50.8188 13.56 51.0215C13.9973 51.2242 14.5147 51.3255 15.112 51.3255C16.04 51.3255 16.7707 51.1388 17.304 50.7655C17.8267 50.3922 18.088 49.8642 18.088 49.1815ZM19.192 39.8105C19.192 40.1732 19.1067 40.5518 18.936 40.9465C18.7547 41.3305 18.5093 41.6932 18.2 42.0345V42.0825L19 42.1945V43.2505H7.608V41.9385H10.712L12.12 41.9705C11.8107 41.6185 11.5547 41.2345 11.352 40.8185C11.1387 40.3918 11.032 39.9652 11.032 39.5385C11.032 38.5252 11.3893 37.7572 12.104 37.2345C12.8187 36.7118 13.7787 36.4505 14.984 36.4505C15.8693 36.4505 16.6267 36.6105 17.256 36.9305C17.8853 37.2398 18.3653 37.6505 18.696 38.1625C19.0267 38.6638 19.192 39.2132 19.192 39.8105ZM18.088 40.0345C18.088 39.3945 17.816 38.8665 17.272 38.4505C16.7173 38.0238 15.96 37.8105 15 37.8105C14.1467 37.8105 13.4587 37.9705 12.936 38.2905C12.4027 38.5998 12.136 39.1225 12.136 39.8585C12.136 40.1892 12.2267 40.5252 12.408 40.8665C12.5893 41.2078 12.8507 41.5652 13.192 41.9385H17.272C17.5707 41.5972 17.784 41.2612 17.912 40.9305C18.0293 40.5892 18.088 40.2905 18.088 40.0345ZM19.192 32.8335C19.192 33.4842 19 34.0282 18.616 34.4655C18.2213 34.8922 17.6773 35.1055 16.984 35.1055C16.1307 35.1055 15.48 34.7268 15.032 33.9695C14.5733 33.2015 14.2533 31.9908 14.072 30.3375C13.7413 30.3375 13.4267 30.3855 13.128 30.4815C12.8293 30.5668 12.5893 30.7268 12.408 30.9615C12.216 31.1855 12.12 31.5108 12.12 31.9375C12.12 32.3855 12.2053 32.8068 12.376 33.2015C12.5467 33.5962 12.7387 33.9482 12.952 34.2575L12.04 34.7695C11.8053 34.4068 11.5813 33.9642 11.368 33.4415C11.144 32.9082 11.032 32.3322 11.032 31.7135C11.032 30.7642 11.3253 30.0762 11.912 29.6495C12.488 29.2228 13.2613 29.0095 14.232 29.0095H19V30.0975L18.072 30.2095V30.2575C18.3707 30.6202 18.632 31.0202 18.856 31.4575C19.08 31.8842 19.192 32.3428 19.192 32.8335ZM18.136 32.4495C18.136 32.0762 18.0453 31.7242 17.864 31.3935C17.6827 31.0628 17.4267 30.7108 17.096 30.3375H14.936C15.096 31.6282 15.336 32.5348 15.656 33.0575C15.976 33.5695 16.3867 33.8255 16.888 33.8255C17.3253 33.8255 17.6453 33.6922 17.848 33.4255C18.04 33.1588 18.136 32.8335 18.136 32.4495ZM19.192 23.491C19.192 24.1737 19.032 24.7923 18.712 25.347C18.392 25.9017 17.928 26.339 17.32 26.659C16.712 26.979 15.9813 27.139 15.128 27.139C14.2533 27.139 13.512 26.9683 12.904 26.627C12.296 26.275 11.832 25.8163 11.512 25.251C11.192 24.675 11.032 24.0563 11.032 23.395C11.032 22.883 11.1227 22.4457 11.304 22.083C11.4853 21.7097 11.6987 21.3897 11.944 21.123L12.808 21.795C12.6053 22.019 12.44 22.259 12.312 22.515C12.184 22.7603 12.12 23.0377 12.12 23.347C12.12 23.8163 12.248 24.2377 12.504 24.611C12.7493 24.9737 13.1013 25.2617 13.56 25.475C14.008 25.6777 14.5307 25.779 15.128 25.779C16.0133 25.779 16.7333 25.5603 17.288 25.123C17.832 24.675 18.104 24.0937 18.104 23.379C18.104 23.0163 18.0293 22.6803 17.88 22.371C17.72 22.0617 17.5333 21.7897 17.32 21.555L18.2 20.979C18.5093 21.331 18.7547 21.7203 18.936 22.147C19.1067 22.5737 19.192 23.0217 19.192 23.491ZM19 19.2661H7.608V17.9701H15.32V17.9221L11.224 14.6101V13.1541L14.344 15.7621L19 12.8021V14.2421L15.256 16.5141L16.952 17.9701H19V19.2661Z" fill="#DADADA" />
            </svg>

            {isFeedbackPopupVisible && (
                <Popup
                    id="list_all_operators_popup"
                    isVisible={isFeedbackPopupVisible}
                    onClose={toggleFeedbackPopup}
                >
                    <Parapraph style={{ color: '#434e4eff' }}>
                        <b>1. How would you rate the overall design of the portfolio?</b>
                    </Parapraph>
                    <div className={styles.FeedbackMenu_stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Icon
                                key={star}
                                onClick={() => choseStars("design", star)}
                                type={star <= answers.design ? "star_fill" : "star"}
                                color={star <= answers.design ? "#1d1d1f" : "#bbbbbb"}
                            />
                        ))}
                    </div>

                    <Parapraph style={{ color: '#434e4eff' }}>
                        <b>2. How would you rate the usability and navigation of the portfolio?</b>
                    </Parapraph>
                    <div className={styles.FeedbackMenu_stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Icon
                                key={star}
                                onClick={() => choseStars("usability", star)}
                                type={star <= answers.usability ? "star_fill" : "star"}
                                color={star <= answers.usability ? "#1d1d1f" : "#bbbbbb"}
                            />
                        ))}
                    </div>

                    <Parapraph style={{ color: '#434e4eff' }}>
                        <b>3. How likely are you to consider working with me based on this portfolio?</b>
                    </Parapraph>
                    <div className={styles.FeedbackMenu_stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Icon
                                key={star}
                                onClick={() => choseStars("work", star)}
                                type={star <= answers.work ? "star_fill" : "star"}
                                color={star <= answers.work ? "#1d1d1f" : "#bbbbbb"}
                            />
                        ))}
                    </div>
                    <Parapraph style={{ color: '#434e4eff' }}>
                        <b>4. How can we improve?</b>
                    </Parapraph>
                    <textarea
                        className={styles.FeedbackMenu_textarea}
                        value={improvement}
                        onChange={handleTextChange}
                        style={{ resize: "both", width: "100%", height: "100px", maxWidth: "100%", minWidth: "100%", maxHeight: "200px", minHeight:"40px" }}
                        placeholder="Your suggestions..."
                    />

                    <br />
                    <hr />
                    • 1 - Bad <br />
                    • 2 - Needs Improvement <br />
                    • 3 - Good <br />
                    • 4 - Very Good <br />
                    • 5 - Excellent <br />
                    <br />
                    <Button
                        color="#1d1d1f"
                        border="#f2f3f7"
                        bgcolor="#f2f3f7"
                        hover_bgcolor="#dedede"
                        onClick={handleNotificationClick1} // New logic to show notification if any question is unanswered
                    >
                        Send
                    </Button>
                </Popup>
            )}

            {showNotification1 && (
                <Notification type="warning">
                    Please answer all the questions before submitting.
                </Notification>
            )}

            {showNotification2 && (
                <Notification type="success">
                    Thank you for your feedback.
                </Notification>
            )}

            {showNotification3 && (
                <Notification type="error">
                    Feedback not sent. Please try again later.
                </Notification>
            )}
        </div>
    );
};

export default FeedbackMenu;
