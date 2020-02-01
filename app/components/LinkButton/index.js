import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '../Button';
import { AddLink, RemoveLink } from '../../actions/links';

export function LinkButton({ provider, link, ...extraProps }) {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.loading[`links:${provider.name}`],
  );

  return (
    <Button
      {...extraProps}
      theme={provider.type}
      icon={provider.type}
      tid={provider.id}
      loading={loading}
      onClick={() => {
        if (link) {
          dispatch(RemoveLink(provider.id, provider.name));
        } else {
          dispatch(AddLink(provider.name));
        }
      }}
    >
      <div>{`${link ? 'Unlink' : 'Link'} ${provider.friendly_name}`}</div>
    </Button>
  );
}

LinkButton.propTypes = {
  provider: PropTypes.object.isRequired,
  link: PropTypes.object,
};
