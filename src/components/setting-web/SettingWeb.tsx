/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Icon } from '@iconify/react';
import { Col, Row, Select, Switch, Typography } from 'antd';

import { CookieKey, LANGUAGE_OPTIONS, Language, LocalStorageKey, ThemeMode } from '@root/constants';
import { SettingWebProps } from '@root/interfaces';
import { storageService } from '@services';
import { useThemeStore } from '@services/store';

export default function SettingWeb({ handleClose }: SettingWebProps) {
  const { appTheme, setTheme } = useThemeStore();
  const isDarkTheme = appTheme === ThemeMode.Dark;

  const changeTheme = (value: boolean) => {
    const newTheme = value ? ThemeMode.Dark : ThemeMode.Light;
    setTheme(newTheme);
    storageService.set(LocalStorageKey.Theme, newTheme);
  };

  const selectedLanguage = LANGUAGE_OPTIONS.find(
    (item) => item.value === storageService.getCookie(CookieKey.LANGUAGE)
  );

  return (
    <div className="w-64">
      <div className="w-full justify-between flex items-center mb-3">
        <Typography.Title level={5}>Settings</Typography.Title>
        <Icon
          icon="material-symbols:close"
          onClick={handleClose}
          fontSize={20}
          className="cursor-pointer"
        />
      </div>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div className="rounded-lg bg-bg-light dark:bg-bg-dark h-32 hover:bg-bg-light-hover relative p-4">
            <Switch
              checked={isDarkTheme}
              onChange={changeTheme}
              checkedChildren="Dark"
              unCheckedChildren="Light"
              className="absolute top-3.5 right-4"
            />

            <Icon icon={isDarkTheme ? 'tdesign:mode-dark' : 'tdesign:mode-light'} fontSize={20} />

            <Typography className="pt-12">Theme for web</Typography>
          </div>
        </Col>

        <Col span={24}>
          <div className="rounded-lg bg-bg-light dark:bg-bg-dark h-32 hover:bg-bg-light-hover relative p-4">
            <Select
              filterOption={false}
              optionLabelProp="label"
              className="absolute top-4 right-4 w-32"
              defaultValue={selectedLanguage?.value || Language.EN}
            >
              {LANGUAGE_OPTIONS?.map((option) => (
                <Select.Option key={option.value} value={option.value} label={option.label}>
                  <div className="flex items-center">
                    <Icon fontSize={16} icon={option.icon} />
                    <Typography.Text className="ml-2">{option.label}</Typography.Text>
                  </div>
                </Select.Option>
              ))}
            </Select>

            <Icon
              className="mt-1.5"
              icon={selectedLanguage?.icon || 'twemoji:flag-us-outlying-islands'}
              fontSize={20}
            />

            <Typography className="pt-12">Choose language</Typography>
          </div>
        </Col>
      </Row>
    </div>
  );
}
