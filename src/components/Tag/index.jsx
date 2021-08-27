import React, { useState, useRef, useEffect, t } from "react";

import styles from "./index.module.scss";

import { Input, Tag, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const DynamicTag = ({ value = [], onChange }) => {
    const editInput = useRef(null);
    const addInput = useRef(null);
    const [tags, setTags] = useState([]);
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [inputValue, setInputValue] = useState("");
    const [editInputValue, setEditInputValue] = useState("");
    const [inputVisible, changeInputVisible] = useState(false);
    const [tagLock, changeTagLock] = useState(false);


    useEffect(() => {
        if (editInputIndex > -1)
            editInput.current.focus();
    }, [editInputIndex])
    useEffect(() => {
        if (inputVisible)
            addInput.current.focus();
    }, [inputVisible])
    useEffect(() => {
        if (value && value.length > 0 && !tagLock) {
            setTags(value);
            changeTagLock(true);
        }
    }, [value])

    const handleTagChange = newTags => {
        setTags(newTags);
        onChange(newTags);
    }
    const handleEditInputChange = (e) => {
        setEditInputValue(e.target.value);
    }
    const handleEditInputConfirm = () => {
        let newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        handleTagChange(newTags);

        setEditInputIndex(-1);
        setEditInputValue("");
    }
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const handleInputConfirm = () => {
        changeInputVisible(false);
        if (inputValue !== "")
            handleTagChange([...tags, inputValue]);
        setInputValue("");
    }
    const handleClose = (index) => {
        let newTags = [...tags];
        newTags.splice(index, 1);
        handleTagChange(newTags);
    }
    return <div className="rf ac">
        {
            tags.map((tag, index) => {
                if (editInputIndex === index) {
                    return <Input
                        ref={editInput}
                        key={tag}
                        size="small"
                        className={styles['tag-input']}
                        value={editInputValue}
                        onChange={handleEditInputChange}
                        onBlur={handleEditInputConfirm}
                        onPressEnter={handleEditInputConfirm}
                    />
                }

                const isLongTag = tag.length > 20;

                const tagElem = (
                    <Tag
                        className={styles['edit-tag']}
                        key={tag}
                        closable
                        color="processing"
                        onClose={() => handleClose(index)}
                    >
                        <span
                            onDoubleClick={e => {
                                setEditInputIndex(index);
                                setEditInputValue(tag);

                                e.preventDefault();
                            }}
                        >
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </span>
                    </Tag>
                );
                return isLongTag
                    ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip>
                    : tagElem
            })
        }
        {inputVisible && (
            <Input
                ref={addInput}
                type="text"
                size="small"
                className={styles['tag-input']}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
            />
        )}
        {!inputVisible && (
            <Tag className={styles['site-tag-plus']} onClick={() => {
                changeInputVisible(true);
            }}>
                <PlusOutlined /> {t('layouts.Tag.newTag')}
            </Tag>
        )}
    </div>
}

export default DynamicTag;