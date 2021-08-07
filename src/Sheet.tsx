import React, {
    FC, CSSProperties, useState, ReactElement, cloneElement
} from 'react'
import DelayedRemoval from './DelayedRemoval'
import generateId from './generateId'
import Portal from './Portal'
import useInjectSheetCSS from './useInjectSheetCSS'

export interface SheetSettings {
    duration?: number
    shadow?: boolean
    style?: CSSProperties
    enterStyle?: CSSProperties
    leaveStyle?: CSSProperties
    shadowStyle?: CSSProperties
    shadowEnterStyle?: CSSProperties
    shadowLeaveStyle?: CSSProperties
}

export enum SheetPosition {
    Top,
    Bottom,
    Left,
    Right
}

const defaultShadowStyle: CSSProperties = {
    'backgroundColor': 'rgba(0, 0, 0, 0.3)',
    'position': 'absolute',
    'top': 0,
    'bottom': 0,
    'left': 0,
    'right': 0
}

const defaultSheetStyle: CSSProperties = {
    'position': 'absolute',
    'top': 0,
    'bottom': 0,
    'left': 0,
    'right': 0
}

export const FormSheetStyle = (
    position: SheetPosition = SheetPosition.Bottom,
    duration: number = 0.3,
    shadow: boolean = true
): SheetSettings => {
    return {
        duration: duration,
        shadow: shadow,
        shadowStyle: defaultShadowStyle,
        style: defaultSheetStyle
    }
}

export const PageSheetStyle = (
    position: SheetPosition = SheetPosition.Bottom,
    duration: number = 0.3,
    shadow: boolean = true
): SheetSettings => {
    return {
        duration: duration,
        shadow: shadow,
        shadowStyle: defaultShadowStyle,
        style: defaultSheetStyle
    }
}

export const FullScreenSheetStyle = (
    position: SheetPosition = SheetPosition.Bottom,
    duration: number = 0.3,
    shadow: boolean = true
): SheetSettings => {
    return {
        duration: duration,
        shadow: shadow,
        shadowStyle: defaultShadowStyle,
        style: defaultSheetStyle
    }
}

interface SheetProps {
    isActive: boolean
    setIsActive(isActive: boolean): void
    settings?: SheetSettings
    children: ReactElement
}

export interface SheetPageProps {
    dismiss(): void
}

const defaultSettings = FullScreenSheetStyle()

const Sheet: FC<SheetProps> = ({ isActive, setIsActive, settings = defaultSettings, children }) => {
    useInjectSheetCSS()
    const [id] = useState(generateId(16))
    return <DelayedRemoval interval={settings.duration ?? 0.3} mount={isActive}>
        <Portal id={id}>
            {settings.shadow ? <div className="__rsp-shadow" style={settings.shadowStyle ?? defaultShadowStyle} onClick={() => {
                setIsActive(false)
            }} />: <></>}
            <div className="__rsp-sheet" style={settings.style ?? defaultSheetStyle}>
                {cloneElement(children, { dismiss: () => setIsActive(false) })}
            </div>
        </Portal>
    </DelayedRemoval>
}

export default Sheet
