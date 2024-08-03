import { Fab, Tooltip } from '@mui/material';
import React from 'react';

function FloatMenu({
  onAddHandler = () => {},
  onUploadHandler = () => {},
  onDeleteHandler = () => {},
  onDownloadHandler = () => {},
  addBtnMessage = 'Add',
  uploadBtnMessage = 'Upload Bulk',
  downloadBtnMessage = 'Download Template',
  deleteBtnMessage = 'Delete All',
  arrow = true,
  size = 'small',
}) {
  return (
    <span className="float-menu-container">
      <Fab color="secondary" className="main-button" size={size}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size == 'small' ? '1.5em' : '2rem'}
          height={size == 'small' ? '1.5em' : '2rem'}
          viewBox="0 0 1200 1200"
        >
          <path
            fill="currentColor"
            d="M255.583 0L29.513 218.249V1200H635.49v-104.328H134.506V292.179h197.589v-187.85h442.844v312.986h104.992V0zm472.725 508.73v249.091H479.145V950.91h249.163V1200h193.016V950.91h249.164V757.821H921.323V508.73z"
          ></path>
        </svg>
      </Fab>

      <div className="fab-container">
        <Tooltip title={addBtnMessage} arrow={arrow} size={size}>
          <Fab color="primary" onClick={onAddHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size == 'small' ? '1.5em' : '2rem'}
              height={size == 'small' ? '1.5em' : '2rem'}
              viewBox="0 0 20 20"
            >
              <g fill="currentColor">
                <path d="M5 11a1 1 0 1 1 0-2h10a1 1 0 1 1 0 2z"></path>
                <path d="M9 5a1 1 0 0 1 2 0v10a1 1 0 1 1-2 0z"></path>
              </g>
            </svg>
          </Fab>
        </Tooltip>
        <Tooltip title={downloadBtnMessage} arrow={arrow} size={size}>
          <Fab color="info" onClick={onDownloadHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size == 'small' ? '1.75em' : '2rem'}
              height={size == 'small' ? '1.5em' : '2rem'}
              viewBox="0 0 1920 1408"
            >
              <path
                fill="currentColor"
                d="M1280 800q0-14-9-23t-23-9h-224V416q0-13-9.5-22.5T992 384H800q-13 0-22.5 9.5T768 416v352H544q-13 0-22.5 9.5T512 800q0 14 9 23l352 352q9 9 23 9t23-9l351-351q10-12 10-24m640 224q0 159-112.5 271.5T1536 1408H448q-185 0-316.5-131.5T0 960q0-130 70-240t188-165q-2-30-2-43q0-212 150-362T768 0q156 0 285.5 87T1242 318q71-62 166-62q106 0 181 75t75 181q0 76-41 138q130 31 213.5 135.5T1920 1024"
              ></path>
            </svg>
          </Fab>
        </Tooltip>
        <Tooltip title={uploadBtnMessage} arrow={arrow} size={size}>
          <Fab color="success" onClick={onUploadHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size == 'small' ? '1.75em' : '2rem'}
              height={size == 'small' ? '1.5em' : '2rem'}
              viewBox="0 0 1920 1408"
            >
              <path
                fill="currentColor"
                d="M1280 736q0-14-9-23L919 361q-9-9-23-9t-23 9L522 712q-10 12-10 24q0 14 9 23t23 9h224v352q0 13 9.5 22.5t22.5 9.5h192q13 0 22.5-9.5t9.5-22.5V768h224q13 0 22.5-9.5t9.5-22.5m640 288q0 159-112.5 271.5T1536 1408H448q-185 0-316.5-131.5T0 960q0-130 70-240t188-165q-2-30-2-43q0-212 150-362T768 0q156 0 285.5 87T1242 318q71-62 166-62q106 0 181 75t75 181q0 76-41 138q130 31 213.5 135.5T1920 1024"
              ></path>
            </svg>
          </Fab>
        </Tooltip>

        <Tooltip title={deleteBtnMessage} arrow={arrow} size={size}>
          <Fab color="error" onClick={onDeleteHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size == 'small' ? '1.5em' : '2rem'}
              height={size == 'small' ? '1.5em' : '2rem'}
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                d="M296 64h-80a7.91 7.91 0 0 0-8 8v24h96V72a7.91 7.91 0 0 0-8-8"
              ></path>
              <path
                fill="currentColor"
                d="M432 96h-96V72a40 40 0 0 0-40-40h-80a40 40 0 0 0-40 40v24H80a16 16 0 0 0 0 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 0 0 0-32M192.57 416H192a16 16 0 0 1-16-15.43l-8-224a16 16 0 1 1 32-1.14l8 224A16 16 0 0 1 192.57 416M272 400a16 16 0 0 1-32 0V176a16 16 0 0 1 32 0Zm32-304h-96V72a7.91 7.91 0 0 1 8-8h80a7.91 7.91 0 0 1 8 8Zm32 304.57A16 16 0 0 1 320 416h-.58A16 16 0 0 1 304 399.43l8-224a16 16 0 1 1 32 1.14Z"
              ></path>
            </svg>
          </Fab>
        </Tooltip>
      </div>
    </span>
  );
}

export default FloatMenu;
