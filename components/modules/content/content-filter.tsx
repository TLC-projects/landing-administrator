interface ContentFilterProps {
    showStatusFilter?: boolean
}

export const ContentFilter: React.FC<ContentFilterProps> = ( { showStatusFilter } ) => {
    return <div className="flex items-start md:items-end gap-4 flex-col md:flex-row justify-start w-full">ContentFilter</div>;
};