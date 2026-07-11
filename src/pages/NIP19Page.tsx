import { nip19 } from 'nostr-tools';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import ProfileWirePage from './ProfileWirePage';
import NaddrWirePage from './NaddrWirePage';
import { WIRE_KIND, ATTESTATION_KIND, ENCRYPTED_RAW_KIND } from '@/lib/publish/wireEvent';

export function NIP19Page() {
  const { nip19: identifier } = useParams<{ nip19: string }>();

  if (!identifier) {
    return <NotFound />;
  }

  // Reject nsec identifiers — never render secret keys
  if (identifier.startsWith('nsec1')) {
    return <NotFound />;
  }

  let decoded;
  try {
    decoded = nip19.decode(identifier);
  } catch {
    return <NotFound />;
  }

  const { type, data } = decoded;

  switch (type) {
    case 'npub':
      return <ProfileWirePage pubkey={data as string} />;

    case 'nprofile': {
      const profile = data as nip19.ProfilePointer;
      return <ProfileWirePage pubkey={profile.pubkey} />;
    }

    case 'naddr': {
      const addr = data as nip19.AddressPointer;
      // Route Delphi kinds to their viewers
      if (addr.kind === WIRE_KIND) {
        return <NaddrWirePage pubkey={addr.pubkey} identifier={addr.identifier} />;
      }
      if (addr.kind === ATTESTATION_KIND || addr.kind === ENCRYPTED_RAW_KIND) {
        // Redirect attestation / encrypted raw to the profile page
        return <ProfileWirePage pubkey={addr.pubkey} />;
      }
      return <NotFound />;
    }

    case 'note':
    case 'nevent':
      // Delphi doesn't handle generic notes/events yet
      return <NotFound />;

    default:
      return <NotFound />;
  }
}
