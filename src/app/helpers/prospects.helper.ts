export function campaignStatusMapper(status: string): string {
  switch (status) {
    case 'BOUNCED':
      return 'Bounced';
    case 'ACTIVE':
      return 'Active';
    case 'REPLIED':
      return 'Responded';
    case 'OPT_OUT':
      return 'Opt-out';
    case 'INVALID':
      return 'Invalid';
    case 'BLACKLIST':
      return 'Blacklisted';
    default:
      return '';
  }
}
