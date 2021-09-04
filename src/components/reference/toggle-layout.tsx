import { useContext } from 'react'
import { Props } from '../../lib/react-nodes'
import { UserSettingsContext } from '../user-settings/user-settings-context'
import styles from './toggle-layout.module.scss'
import Image from 'next/image'

export function ToggleLayout({ className }: Props) {
  const settings = useContext(UserSettingsContext)

  return (
    <div className={className}>
      {settings.referenceLayout === 'list' ? (
        <>
          <button
            className={styles.button}
            title="Switch to table view"
            onClick={() => settings.update({ referenceLayout: 'table' })}
          >
            <Image src="/img/icons/reference-table.svg" alt="Switch to table view" />
          </button>
          <button
            className={styles.button}
            disabled={true}
            title="List view"
            onClick={() => settings.update({ referenceLayout: 'list' })}
          >
            <Image src="/img/icons/reference-list.svg" alt="List view" />
          </button>
        </>
      ) : (
        <>
          <button
            className={styles.button}
            disabled={true}
            title="Table view"
            onClick={() => settings.update({ referenceLayout: 'table' })}
          >
            <Image src="/img/icons/reference-table.svg" alt="Table view" />
          </button>
          <button
            className={styles.button}
            title="Switch to list view"
            onClick={() => settings.update({ referenceLayout: 'list' })}
          >
            <Image src="/img/icons/reference-list.svg" alt="Switch to list view" />
          </button>
        </>
      )}
    </div>
  )
}
