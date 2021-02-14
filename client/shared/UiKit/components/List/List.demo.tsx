import React from 'react';
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Icon,
    Button,
    Divider,
    Typography,
} from 'SharedComponents';

export const ListDemo = () => (
    <>
        <Divider style={{ marginTop: 24 }} />

        <Typography variant="h3" align="center">
            List Items
        </Typography>
        <List>
            <ListItem>
                <ListItemAvatar type="3d_rotation" />
                <ListItemText>
                    List item avatar + text + button (icon)
                </ListItemText>
                <Button
                    variant="text"
                    isCircle
                    icon={<Icon type="face" size="small" />}
                />
            </ListItem>
            <ListItem>
                <ListItemIcon type="bookmark_added" />
                <ListItemText>List item icon + text</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>List item text</ListItemText>
            </ListItem>
        </List>
    </>
);
