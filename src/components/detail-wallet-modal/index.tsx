import { Icon } from '@iconify/react';
import { Card, Typography } from 'antd';

import { ModalBodyProps, WalletInfo } from '@root/interfaces';
import { formatAddress } from '@root/utils';
import './detail-wallet-modal.scss';

export default function DetailWalletModalBody({ data }: ModalBodyProps) {
  const walletInfo = data as WalletInfo;

  return (
    <div className="detail-wallet-modal">
      <Card
        className="text-white rounded-2xl p-1"
        style={{ background: 'linear-gradient(246.01deg,#1B70D5 2.11%,#052055 97.26%)' }}
        size="small"
      >
        <div className="flex">
          <div className="flex items-center">
            <Icon icon="logos:metamask-icon" />

            <Typography.Paragraph
              copyable={{
                text: walletInfo.accounts[0],
              }}
              className="text-white ml-1 text-copyable"
            >
              {formatAddress(walletInfo.accounts[0])}
            </Typography.Paragraph>
          </div>
        </div>
      </Card>
    </div>
  );
}
