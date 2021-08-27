import React, { useState, useEffect, t } from "react"

import { requestLocationList } from "service/common";

import { Cascader } from "antd";

const CountryCity = ({ value = [], onChange, data = [], changeOnSelect = false, level = 3 }) => {
    const [areaList, setAreaList] = useState([]);
    const [areaValue, setAreaValue] = useState([]);
    const [lock, changeLock] = useState(false);
    const getAreaList = (payload) => {
        return requestLocationList(payload);
    }
    const toLoadData = options => {
        let targetOption = options[options.length - 1];
        targetOption.loading = true;
        let payload = {
            level: targetOption.level + 1,
            parentId: targetOption.value
        }
        getAreaList(payload)
            .then(response => {
                targetOption.loading = false;
                targetOption.children = response.list.map(area => ({
                    value: area.id,
                    label: `${area.name}-${area.nameEn}`,
                    level: payload.level,
                    isLeaf: payload.level === level
                }));
                setAreaList([...areaList]);
            })
    }
    const handleChange = (e) => {
        onChange(e);
        setAreaValue(e)
    }
    useEffect(() => {
        if (data.length > 0) {
            setAreaList(data)
            if (value.length > 0 && !lock) {
                changeLock(true);

                let areaList = data;
                value.forEach((areaId, index) => {
                    let currentLevel = index + 3;
                    if (currentLevel <= level) {
                        let payload = {
                            level: currentLevel,
                            parentId: areaId
                        }
                        getAreaList(payload)
                            .then(response => {
                                let area = areaList.find(ar => ar.value === areaId);
                                areaList = area.children = response.list.map(ar => ({ value: ar.id, label: `${ar.name}-${ar.nameEn}`, isLeaf: currentLevel === level }));
                                // 最后一次获取数据之后，保存数据
                                if (currentLevel === level) {
                                    setAreaList(data);
                                    setAreaValue(value)
                                }
                            })
                    }
                })
            }
        }
    }, [value, data])

    return <Cascader placeholder={t('merchant.countryCity')} changeOnSelect={changeOnSelect} value={areaValue} options={areaList} onChange={(e) => {
        handleChange(e);
    }} loadData={toLoadData} />
}

export default CountryCity;