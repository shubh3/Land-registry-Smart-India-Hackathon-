import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import ReportIcon from '@material-ui/icons/Report';
import HelpIcon from '@material-ui/icons/Help';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Link from "@material-ui/core/Link";


export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <CompareArrowsIcon />
      </ListItemIcon>
      <ListItemText  primary="Recent Transactions" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Report Issue" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Support" />
    </ListItem>
  </div>
);