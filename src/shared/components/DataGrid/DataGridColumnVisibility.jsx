import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
} from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

/**
 * Menú de visibilidad de columnas.
 *
 * Usa `meta.label` como nombre visible, porque `columnDef.header` puede ser
 * JSX (por ejemplo el checkbox de "seleccionar todo") y no sirve como etiqueta.
 */
export function DataGridColumnVisibility({ table, buttonLabel = 'Columnas' }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const hideableColumns = table
    .getAllLeafColumns()
    .filter((column) => column.getCanHide());

  if (hideableColumns.length === 0) return null;

  return (
    <>
      <Button
        id='data-grid-columns-button'
        startIcon={<ViewColumnIcon />}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        aria-haspopup='true'
        aria-expanded={isOpen ? 'true' : undefined}
        aria-controls={isOpen ? 'data-grid-columns-menu' : undefined}
      >
        {buttonLabel}
      </Button>

      <Menu
        id='data-grid-columns-menu'
        anchorEl={anchorEl}
        open={isOpen}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{ 'aria-labelledby': 'data-grid-columns-button' }}
      >
        {hideableColumns.map((column) => (
          <MenuItem key={column.id} dense>
            <FormControlLabel
              control={
                <Checkbox
                  size='small'
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                />
              }
              label={column.columnDef.meta?.label ?? column.id}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
